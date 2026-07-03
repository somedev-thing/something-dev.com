"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Carrot,
  Desktop,
  FileText,
  Folder,
  GameController,
  Horse,
  Lightning,
  PaintBrush,
  Play,
  TerminalWindow,
  Trash,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

const BOOT_LOG = [
  "PONY BIOS v0.8.15",
  "Counting hooves........................ 4 OK",
  "Checking fence voltage................. TOO SPICY",
  "Mounting /dev/stable................... DIRTY",
  "Loading carrot allocation table........ 4 ENTRIES",
  "Starting neighwork manager.............. ONLINE",
  "Ignoring responsible_finances.dll....... DONE",
  "PonyOS is ready to make poor decisions.",
];

const GRID_COLUMNS = 10;
const GRID_SIZE = 60;
type Level = { start: number; fences: Set<number>; carrots: number[] };
type WindowName = "game" | "classified" | "trash" | "terminal" | "root" | "showcontrol" | "paint" | "system" | null;

function getNeighbors(cell: number) {
  const column = cell % GRID_COLUMNS;
  const neighbors: number[] = [];
  if (column > 0) neighbors.push(cell - 1);
  if (column < GRID_COLUMNS - 1) neighbors.push(cell + 1);
  if (cell >= GRID_COLUMNS) neighbors.push(cell - GRID_COLUMNS);
  if (cell < GRID_SIZE - GRID_COLUMNS) neighbors.push(cell + GRID_COLUMNS);
  return neighbors;
}

function canReachEveryCarrot(start: number, fences: Set<number>, carrots: number[]) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const current = queue.shift()!;
    getNeighbors(current).forEach((next) => {
      if (!fences.has(next) && !visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    });
  }
  return carrots.every((carrot) => visited.has(carrot));
}

function createRandomLevel(): Level {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const cells = Array.from({ length: GRID_SIZE }, (_, index) => index);
    cells.sort(() => Math.random() - 0.5);
    const start = cells[0];
    const carrots = cells.slice(1, 5);
    const protectedCells = new Set([start, ...carrots]);
    const fences = new Set(cells.slice(5).filter((cell) => !protectedCells.has(cell)).slice(0, 15));
    if (canReachEveryCarrot(start, fences, carrots)) return { start, fences, carrots };
  }
  return { start: 0, fences: new Set(), carrots: [9, 29, 40, 58] };
}

function systemBeep(frequency: number, duration = 0.08, type: OscillatorType = "square") {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.06, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
  oscillator.addEventListener("ended", () => context.close());
}

function startupChime() {
  const context = new AudioContext();
  const notes = [
    [261.63, 0],
    [392, 0.18],
    [523.25, 0.38],
    [659.25, 0.6],
    [783.99, 0.82],
  ];
  notes.forEach(([frequency, offset], index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index < 2 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    const start = context.currentTime + offset;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.055, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.75);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.8);
  });
  window.setTimeout(() => context.close(), 1800);
  return context.state === "running";
}

function WindowFrame({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`absolute left-1/2 top-1/2 z-20 max-h-[78%] w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border-2 border-black bg-[#c7c7c7] text-black shadow-[10px_10px_0_rgba(0,0,0,.28)] ${wide ? "max-w-4xl" : "max-w-xl"}`}>
      <div className="flex items-center justify-between bg-[#001a8b] px-2 py-1 text-white">
        <div className="font-mono text-xs font-bold">{title}</div>
        <button type="button" onClick={onClose} className="flex h-6 w-7 items-center justify-center border border-white/60 bg-[#c7c7c7] text-black shadow-[inset_-1px_-1px_#555,inset_1px_1px_white]">
          <X size={14} weight="bold" />
        </button>
      </div>
      {children}
    </div>
  );
}

export default function HorseExecutable() {
  const router = useRouter();
  const startupAttempted = useRef(false);
  const startupPlayed = useRef(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [desktopReady, setDesktopReady] = useState(false);
  const [activeWindow, setActiveWindow] = useState<WindowName>(null);
  const [level, setLevel] = useState<Level>(() => createRandomLevel());
  const [pony, setPony] = useState(level.start);
  const [collected, setCollected] = useState<number[]>([]);
  const [shocks, setShocks] = useState(0);
  const [flash, setFlash] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showCue, setShowCue] = useState(0);
  const [paintColor, setPaintColor] = useState("#001a8b");
  const [paintedCells, setPaintedCells] = useState<Record<number, string>>({});
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState(["PonyShell 95 [Version 0.0.4]", "Type HELP if your human brain requires assistance."]);

  useEffect(() => {
    if (!startupAttempted.current) {
      startupAttempted.current = true;
      startupPlayed.current = startupChime();
    }
    const timer = window.setTimeout(() => {
      if (bootIndex < BOOT_LOG.length) setBootIndex((index) => index + 1);
      else setDesktopReady(true);
    }, bootIndex < BOOT_LOG.length ? 420 : 900);
    return () => window.clearTimeout(timer);
  }, [bootIndex]);

  const movePony = useCallback((delta: number) => {
    const currentColumn = pony % GRID_COLUMNS;
    if ((delta === -1 && currentColumn === 0) || (delta === 1 && currentColumn === GRID_COLUMNS - 1)) return;

    const target = pony + delta;
    if (target < 0 || target >= GRID_SIZE) return;

    if (level.fences.has(target)) {
      setShocks((value) => value + 1);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 140);
      systemBeep(115, 0.18, "sawtooth");
      return;
    }

    setPony(target);
    systemBeep(180 + (target % 5) * 25, 0.045, "square");

    if (level.carrots.includes(target) && !collected.includes(target)) {
      const nextCollected = [...collected, target];
      setCollected(nextCollected);
      systemBeep(880, 0.12, "sine");
      if (nextCollected.length === level.carrots.length) {
        window.setTimeout(() => setActiveWindow("root"), 450);
      }
    }
  }, [collected, level, pony]);

  useEffect(() => {
    if (activeWindow !== "game") return;
    const handleKey = (event: KeyboardEvent) => {
      const movement: Record<string, number> = {
        ArrowLeft: -1,
        a: -1,
        ArrowRight: 1,
        d: 1,
        ArrowUp: -GRID_COLUMNS,
        w: -GRID_COLUMNS,
        ArrowDown: GRID_COLUMNS,
        s: GRID_COLUMNS,
      };
      const delta = movement[event.key];
      if (delta) {
        event.preventDefault();
        movePony(delta);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeWindow, movePony]);

  const newGame = () => {
    const nextLevel = createRandomLevel();
    setLevel(nextLevel);
    setPony(nextLevel.start);
    setCollected([]);
    setShocks(0);
  };

  const openWindow = (windowName: WindowName) => {
    systemBeep(520, 0.055, "square");
    if (windowName === "game") newGame();
    setStartMenuOpen(false);
    setActiveWindow(windowName);
  };

  const runCommand = (event: FormEvent) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    const replies: Record<string, string> = {
      help: "Commands: HELP, LS, WHOAMI, NEIGH, SUDO, RICK, CLEAR",
      ls: "fence_escape.exe  classified.txt  stable.cfg  definitely_not_a_backdoor",
      whoami: "guest_human (low trust, suspiciously few hooves)",
      neigh: "Privilege escalation accepted. Reason: convincing accent.",
      sudo: "guest_human is not in the sudoers file. This incident will be neighed about.",
      rick: "Opening the classified audio subsystem...",
    };

    if (command === "clear") {
      setTerminalLines([]);
    } else {
      setTerminalLines((lines) => [...lines, `C:\\STABLE> ${terminalInput}`, replies[command] ?? `Bad command or file name: ${terminalInput}`]);
    }
    setTerminalInput("");
    systemBeep(command === "rick" ? 880 : 420, 0.06);
    if (command === "rick") window.setTimeout(() => router.push("/backstage?armed=1"), 650);
  };

  if (!desktopReady) {
    return (
      <main
        onPointerDown={() => {
          if (!startupPlayed.current) startupPlayed.current = startupChime();
        }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101c45] px-6 text-white"
      >
        <div className="absolute inset-y-0 left-0 w-[18vw] bg-gradient-to-r from-[#68151e] to-[#27070c] shadow-[inset_-18px_0_35px_rgba(0,0,0,.45)]" />
        <div className="absolute inset-y-0 right-0 w-[18vw] bg-gradient-to-l from-[#68151e] to-[#27070c] shadow-[inset_18px_0_35px_rgba(0,0,0,.45)]" />
        <div className="absolute left-1/2 top-0 h-[70vh] w-[42vw] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(255,244,189,.22),transparent)] [clip-path:polygon(43%_0,57%_0,100%_100%,0_100%)]" />
        <div className="project-grid absolute inset-0 opacity-20" />

        <div className="relative w-full max-w-xl text-center">
          <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white shadow-[0_12px_45px_rgba(0,0,0,.35)]">
            <Horse size={72} weight="fill" className="text-[#174c9b]" />
          </div>
          <h1 className="font-display text-5xl font-black tracking-[-0.055em] md:text-7xl">
            pony<span className="font-light text-white/55">OS</span>
          </h1>
          <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#ffca4b]">Professional Theater Edition</div>

          <div className="mx-auto mt-12 h-5 max-w-xs overflow-hidden rounded border-2 border-white/70 bg-[#07102d] p-0.5 shadow-[inset_0_2px_5px_rgba(0,0,0,.7)]">
            <motion.div
              className="flex h-full w-24 gap-1"
              animate={{ x: [-100, 340] }}
              transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
            >
              <span className="h-full flex-1 bg-[#2f7ce0]" />
              <span className="h-full flex-1 bg-[#65a7ff]" />
              <span className="h-full flex-1 bg-[#2f7ce0]" />
            </motion.div>
          </div>
          <div className="mt-5 h-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
            {BOOT_LOG[Math.min(bootIndex, BOOT_LOG.length - 1)]}
          </div>

          <div className="mt-16 flex items-center justify-center gap-3 text-white/25">
            <Play size={16} weight="fill" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">The show must boot</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`relative min-h-[100svh] overflow-hidden bg-[#008080] pt-24 font-sans text-black transition-colors ${flash ? "bg-white" : ""}`}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative h-[calc(100svh-6rem)] min-h-[620px] p-5 pb-16 md:p-8 md:pb-16">
        <div className="grid w-fit grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-2">
          {[
            { name: "Fence Escape", icon: GameController, color: "#f5c84b", action: () => openWindow("game") },
            { name: "Show Control", icon: Play, color: "#e83b4f", action: () => openWindow("showcontrol") },
            { name: "Pony Paint", icon: PaintBrush, color: "#ff7ab8", action: () => openWindow("paint") },
            { name: "My Stable", icon: Desktop, color: "#d6e8ff", action: () => openWindow("system") },
            { name: "classified.txt", icon: FileText, color: "#ffffff", action: () => openWindow("classified") },
            { name: "StableShell", icon: TerminalWindow, color: "#87e36b", action: () => openWindow("terminal") },
            { name: "Recycle Bin", icon: Trash, color: "#d7d7d7", action: () => openWindow("trash") },
          ].map((item) => (
            <button key={item.name} type="button" onDoubleClick={item.action} onClick={item.action} className="group flex w-24 flex-col items-center gap-1 text-center">
              <item.icon size={48} weight="fill" style={{ color: item.color }} className="drop-shadow-[2px_2px_0_rgba(0,0,0,.3)] transition-transform group-hover:scale-110" />
              <span className="bg-[#001a8b] px-1 text-xs leading-tight text-white">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="absolute right-6 top-8 hidden max-w-sm rotate-2 border-2 border-black bg-[#fff59d] p-5 font-mono text-xs shadow-[7px_7px_0_rgba(0,0,0,.2)] md:block">
          <strong className="mb-2 block text-sm">STABLE ADMIN NOTE</strong>
          Do not let the pony collect all four carrots. Last time it gained root access and subscribed the server to twelve newsletters.
        </div>

        {activeWindow === "game" && (
          <WindowFrame title="Fence Escape Deluxe 95" onClose={() => setActiveWindow(null)} wide>
            <div className="border-b-2 border-black bg-[#e8e8e8] px-4 py-3 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>CARROTS {collected.length}/{level.carrots.length} &nbsp;|&nbsp; ELECTROCUTIONS {shocks} &nbsp;|&nbsp; LEVEL VERIFIED REACHABLE</span>
                <button type="button" onClick={newGame} className="border border-black bg-[#c7c7c7] px-2 py-1 font-bold shadow-[inset_-1px_-1px_#555,inset_1px_1px_white]">NEW RANDOM LEVEL</button>
              </div>
            </div>
            <div className="bg-[#0b3815] p-3 md:p-5">
              <div className="grid border-l border-t border-lime-200/15" style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}>
                {Array.from({ length: GRID_SIZE }, (_, cell) => {
                  const isPony = cell === pony;
                  const isFence = level.fences.has(cell);
                  const hasCarrot = level.carrots.includes(cell) && !collected.includes(cell);
                  return (
                    <div key={cell} className="flex aspect-square items-center justify-center border-b border-r border-lime-200/15 bg-[#174d20] text-sm md:text-xl">
                      {isPony ? <Horse size={28} weight="fill" className="text-white drop-shadow-[0_0_6px_white]" /> : isFence ? <Lightning weight="fill" className="text-yellow-300" /> : hasCarrot ? <Carrot size={25} weight="fill" className="text-orange-400" /> : null}
                    </div>
                  );
                })}
              </div>
              <div className="mx-auto mt-4 grid w-36 grid-cols-3 gap-1 font-mono text-black">
                <span />
                <button type="button" aria-label="Move up" onClick={() => movePony(-GRID_COLUMNS)} className="flex justify-center border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]"><ArrowUp weight="bold" /></button>
                <span />
                <button type="button" aria-label="Move left" onClick={() => movePony(-1)} className="flex justify-center border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]"><ArrowLeft weight="bold" /></button>
                <button type="button" aria-label="Move down" onClick={() => movePony(GRID_COLUMNS)} className="flex justify-center border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]"><ArrowDown weight="bold" /></button>
                <button type="button" aria-label="Move right" onClick={() => movePony(1)} className="flex justify-center border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]"><ArrowRight weight="bold" /></button>
              </div>
            </div>
          </WindowFrame>
        )}

        {activeWindow === "classified" && (
          <WindowFrame title="classified.txt - Notepad" onClose={() => setActiveWindow(null)}>
            <div className="min-h-72 bg-white p-6 font-mono text-sm leading-relaxed">
              PROJECT: OPERATION RICK<br />
              STATUS: Definitely not hidden<br /><br />
              The audio subsystem is accessible through StableShell. The activation word is four letters long, begins with R, and has caused more suspicious links than any other first name.<br /><br />
              Alternative access: tap the site logo five times before it notices.
            </div>
          </WindowFrame>
        )}

        {activeWindow === "trash" && (
          <WindowFrame title="Recycle Bin" onClose={() => setActiveWindow(null)}>
            <div className="min-h-64 bg-white p-6">
              <div className="grid grid-cols-[auto_1fr] gap-5">
                <Folder size={46} weight="fill" className="text-yellow-500" />
                <div>
                  <strong className="block">responsible_financial_decisions</strong>
                  <span className="text-sm text-black/55">0 bytes. Last modified: never.</span>
                </div>
                <FileText size={46} weight="fill" className="text-blue-700" />
                <div>
                  <strong className="block">buy_a_new_macbook.txt</strong>
                  <span className="text-sm text-black/55">Access denied by bank account.</span>
                </div>
              </div>
            </div>
          </WindowFrame>
        )}

        {activeWindow === "terminal" && (
          <WindowFrame title="StableShell.exe" onClose={() => setActiveWindow(null)} wide>
            <div className="h-96 overflow-y-auto bg-black p-5 font-mono text-xs leading-relaxed text-lime-300">
              {terminalLines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
              <form onSubmit={runCommand} className="mt-2 flex">
                <label htmlFor="pony-command">C:\STABLE&gt;&nbsp;</label>
                <input
                  id="pony-command"
                  value={terminalInput}
                  onChange={(event) => setTerminalInput(event.target.value)}
                  autoFocus
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-lime-300 outline-none"
                />
              </form>
            </div>
          </WindowFrame>
        )}

        {activeWindow === "showcontrol" && (
          <WindowFrame title="PonyCue Show Control 5" onClose={() => setActiveWindow(null)} wide>
            <div className="grid min-h-96 bg-[#202020] text-white md:grid-cols-[1fr_220px]">
              <div className="p-5">
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Tonight&apos;s cue stack</div>
                {["House to half", "Preset stage", "LX 1: Warm sunrise", "SFX 3: Suspicious hoofbeats", "Pony entrance", "Blackout"].map((cue, index) => (
                  <div key={cue} className={`mb-1 grid grid-cols-[3rem_1fr_auto] items-center border px-3 py-3 font-mono text-xs ${index === showCue ? "border-[#ffca4b] bg-[#ffca4b] text-black" : index < showCue ? "border-white/5 bg-white/5 text-white/25" : "border-white/10 bg-black/30"}`}>
                    <span>{(index + 1).toString().padStart(2, "0")}</span>
                    <span>{cue}</span>
                    <span>{index < showCue ? "DONE" : index === showCue ? "STANDBY" : "WAIT"}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between border-l border-white/10 bg-black/30 p-5">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">Next cue</div>
                  <div className="mt-2 font-display text-2xl font-black">{showCue < 6 ? showCue + 1 : "SHOW COMPLETE"}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    systemBeep(showCue === 4 ? 880 : 560, 0.16, "sine");
                    setShowCue((cue) => (cue < 6 ? cue + 1 : 0));
                  }}
                  className="aspect-square rounded-full border-8 border-[#7b111d] bg-[#e72f40] font-display text-5xl font-black text-white shadow-[inset_0_-10px_20px_rgba(0,0,0,.28),0_8px_0_#490912] active:translate-y-2 active:shadow-none"
                >
                  GO
                </button>
              </div>
            </div>
          </WindowFrame>
        )}

        {activeWindow === "paint" && (
          <WindowFrame title="Pony Paint" onClose={() => setActiveWindow(null)} wide>
            <div className="border-b-2 border-black bg-[#dfdfdf] p-3">
              <div className="flex flex-wrap items-center gap-2">
                {["#001a8b", "#e72f40", "#f5c84b", "#198b45", "#9c4dcc", "#111111", "#ffffff"].map((color) => (
                  <button key={color} type="button" aria-label={`Use ${color}`} onClick={() => setPaintColor(color)} className={`h-7 w-7 border-2 ${paintColor === color ? "border-white ring-2 ring-black" : "border-black"}`} style={{ backgroundColor: color }} />
                ))}
                <button type="button" onClick={() => setPaintedCells({})} className="ml-auto border-2 border-black bg-[#c7c7c7] px-3 py-1 font-mono text-[10px] font-bold shadow-[inset_-1px_-1px_#555,inset_1px_1px_white]">CLEAR STAGE</button>
              </div>
            </div>
            <div className="bg-[#777] p-4">
              <div className="mx-auto grid max-w-2xl grid-cols-12 border-l border-t border-black/25 bg-white">
                {Array.from({ length: 96 }, (_, cell) => (
                  <button
                    key={cell}
                    type="button"
                    aria-label={`Paint cell ${cell + 1}`}
                    onPointerEnter={(event) => {
                      if (event.buttons === 1) setPaintedCells((cells) => ({ ...cells, [cell]: paintColor }));
                    }}
                    onClick={() => setPaintedCells((cells) => ({ ...cells, [cell]: paintColor }))}
                    className="aspect-square border-b border-r border-black/15"
                    style={{ backgroundColor: paintedCells[cell] ?? "#ffffff" }}
                  />
                ))}
              </div>
              <div className="mt-3 text-center font-mono text-[10px] text-white">Draw the set. Regret it. Call it experimental theater.</div>
            </div>
          </WindowFrame>
        )}

        {activeWindow === "system" && (
          <WindowFrame title="My Stable - System Properties" onClose={() => setActiveWindow(null)}>
            <div className="min-h-80 bg-white p-6">
              <div className="mb-6 flex items-center gap-5 border-b pb-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#174c9b]">
                  <Horse size={54} weight="fill" className="text-white" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-black">PonyOS</h2>
                  <p className="text-sm text-black/50">Professional Theater Edition</p>
                </div>
              </div>
              <div className="grid grid-cols-[130px_1fr] gap-y-3 text-sm">
                <strong>Computer</strong><span>MacBook Pro 12,1</span>
                <strong>Processor</strong><span>Two highly motivated Intel cores</span>
                <strong>Memory</strong><span>8 GB, shared democratically</span>
                <strong>Storage</strong><span>120 GB, mostly package caches</span>
                <strong>Registered to</strong><span>The pony currently at the keyboard</span>
                <strong>Uptime</strong><span>Until IntelliJ indexes something</span>
              </div>
            </div>
          </WindowFrame>
        )}

        {activeWindow === "root" && (
          <WindowFrame title="CRITICAL SYSTEM EVENT" onClose={() => setActiveWindow(null)}>
            <div className="bg-[#ffef4a] p-8 text-center">
              <Horse size={82} weight="fill" className="mx-auto mb-5" />
              <h2 className="font-display text-4xl font-black leading-none">PONY ACHIEVED ROOT ACCESS</h2>
              <p className="mt-5 text-sm">It ate four carrots, disabled the firewall, and found the music directory.</p>
              <button type="button" onClick={() => router.push("/backstage?armed=1")} className="mt-7 border-2 border-black bg-[#c7c7c7] px-5 py-3 font-mono text-xs font-bold shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">
                OPEN COMPROMISED AUDIO SUBSYSTEM
              </button>
            </div>
          </WindowFrame>
        )}

        {startMenuOpen && (
          <div className="absolute bottom-12 left-2 z-30 w-72 border-2 border-black bg-[#c7c7c7] shadow-[8px_8px_0_rgba(0,0,0,.28)]">
            <div className="flex items-center gap-3 bg-[#174c9b] p-4 text-white">
              <Horse size={38} weight="fill" />
              <div><strong className="block">Dustin&apos;s PonyOS</strong><span className="text-xs text-white/60">Administrator, unfortunately</span></div>
            </div>
            <div className="p-2">
              {[
                { name: "Fence Escape", icon: GameController, windowName: "game" as WindowName },
                { name: "Show Control", icon: Play, windowName: "showcontrol" as WindowName },
                { name: "Pony Paint", icon: PaintBrush, windowName: "paint" as WindowName },
                { name: "StableShell", icon: TerminalWindow, windowName: "terminal" as WindowName },
              ].map((item) => (
                <button key={item.name} type="button" onClick={() => openWindow(item.windowName)} className="flex w-full items-center gap-3 p-3 text-left text-sm font-bold hover:bg-[#174c9b] hover:text-white">
                  <item.icon size={22} weight="fill" /> {item.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex h-12 items-center border-t-2 border-white bg-[#c7c7c7] px-2 shadow-[inset_0_2px_white]">
          <button type="button" onClick={() => setStartMenuOpen((open) => !open)} className="flex h-9 items-center gap-2 border-2 border-black bg-[#c7c7c7] px-3 font-mono text-xs font-bold shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">
            <Horse size={19} weight="fill" /> START
          </button>
          <div className="ml-2 hidden border-2 border-black/60 bg-[#ddd] px-3 py-2 font-mono text-[10px] sm:block">PonyOS is running on 8 MB of emotionally available memory</div>
          <Link href="/" className="ml-auto border-2 border-black/60 bg-[#ddd] px-3 py-2 font-mono text-[10px]">
            EXIT TO WEBSITE
          </Link>
        </div>
      </div>
    </main>
  );
}
