"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Horse, Lightning, X } from "@phosphor-icons/react/dist/ssr";
import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";

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
const FENCES = new Set([6, 7, 16, 26, 27, 28, 38, 39, 40, 41, 42, 52]);
const CARROTS = [9, 24, 45, 58];

type WindowName = "game" | "classified" | "trash" | "terminal" | "root" | null;

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
  const [bootIndex, setBootIndex] = useState(0);
  const [desktopReady, setDesktopReady] = useState(false);
  const [activeWindow, setActiveWindow] = useState<WindowName>(null);
  const [pony, setPony] = useState(0);
  const [collected, setCollected] = useState<number[]>([]);
  const [shocks, setShocks] = useState(0);
  const [flash, setFlash] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState(["PonyShell 95 [Version 0.0.4]", "Type HELP if your human brain requires assistance."]);

  useEffect(() => {
    if (bootIndex >= BOOT_LOG.length) return;
    const timer = window.setTimeout(() => setBootIndex((index) => index + 1), 260);
    return () => window.clearTimeout(timer);
  }, [bootIndex]);

  const movePony = useCallback((delta: number) => {
    const currentColumn = pony % GRID_COLUMNS;
    if ((delta === -1 && currentColumn === 0) || (delta === 1 && currentColumn === GRID_COLUMNS - 1)) return;

    const target = pony + delta;
    if (target < 0 || target >= GRID_SIZE) return;

    if (FENCES.has(target)) {
      setShocks((value) => value + 1);
      setFlash(true);
      window.setTimeout(() => setFlash(false), 140);
      systemBeep(115, 0.18, "sawtooth");
      return;
    }

    setPony(target);
    systemBeep(180 + (target % 5) * 25, 0.045, "square");

    if (CARROTS.includes(target) && !collected.includes(target)) {
      const nextCollected = [...collected, target];
      setCollected(nextCollected);
      systemBeep(880, 0.12, "sine");
      if (nextCollected.length === CARROTS.length) {
        window.setTimeout(() => setActiveWindow("root"), 450);
      }
    }
  }, [collected, pony]);

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

  const openWindow = (windowName: WindowName) => {
    systemBeep(520, 0.055, "square");
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
    if (command === "rick") window.setTimeout(() => router.push("/backstage"), 650);
  };

  if (!desktopReady) {
    return (
      <main className="min-h-screen bg-black px-6 pb-20 pt-36 font-mono text-sm text-lime-300 md:px-12 md:pt-44">
        <div className="mx-auto max-w-4xl border border-lime-300/30 bg-[#020702] p-6 shadow-[0_0_80px_rgba(163,230,53,.08)] md:p-10">
          <div className="mb-7 flex items-center justify-between border-b border-lime-300/20 pb-4">
            <span>PONY BIOS SETUP UTILITY</span>
            <span className="animate-pulse">●</span>
          </div>
          <div className="min-h-72 space-y-3 text-xs md:text-sm">
            {BOOT_LOG.slice(0, bootIndex).map((line) => (
              <div key={line}>{line}</div>
            ))}
            {bootIndex < BOOT_LOG.length && <span className="inline-block h-4 w-2 animate-pulse bg-lime-300" />}
          </div>
          {bootIndex >= BOOT_LOG.length && (
            <button
              type="button"
              onClick={() => {
                systemBeep(660, 0.12);
                setDesktopReady(true);
              }}
              className="mt-8 border border-lime-300 bg-lime-300 px-5 py-3 font-bold text-black hover:bg-black hover:text-lime-300"
            >
              [ MOUNT UNSTABLE PARTITION ]
            </button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className={`relative min-h-[100svh] overflow-hidden bg-[#008080] pt-24 font-sans text-black transition-colors ${flash ? "bg-white" : ""}`}>
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative h-[calc(100svh-6rem)] min-h-[620px] p-5 pb-16 md:p-8 md:pb-16">
        <div className="grid w-fit grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-1">
          {[
            { name: "Fence Escape", icon: "🐴", action: () => openWindow("game") },
            { name: "classified.txt", icon: "📄", action: () => openWindow("classified") },
            { name: "StableShell", icon: "🖥️", action: () => openWindow("terminal") },
            { name: "Recycle Bin", icon: "🗑️", action: () => openWindow("trash") },
          ].map((item) => (
            <button key={item.name} type="button" onDoubleClick={item.action} onClick={item.action} className="group flex w-24 flex-col items-center gap-1 text-center">
              <span className="text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,.3)] transition-transform group-hover:scale-110">{item.icon}</span>
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
              CARROTS {collected.length}/4 &nbsp;|&nbsp; ELECTROCUTIONS {shocks} &nbsp;|&nbsp; Controls: WASD, arrows, or the questionable D-pad
            </div>
            <div className="bg-[#0b3815] p-3 md:p-5">
              <div className="grid border-l border-t border-lime-200/15" style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}>
                {Array.from({ length: GRID_SIZE }, (_, cell) => {
                  const isPony = cell === pony;
                  const isFence = FENCES.has(cell);
                  const hasCarrot = CARROTS.includes(cell) && !collected.includes(cell);
                  return (
                    <div key={cell} className="flex aspect-square items-center justify-center border-b border-r border-lime-200/15 bg-[#174d20] text-sm md:text-xl">
                      {isPony ? <Horse size={28} weight="fill" className="text-white drop-shadow-[0_0_6px_white]" /> : isFence ? <Lightning weight="fill" className="text-yellow-300" /> : hasCarrot ? "🥕" : null}
                    </div>
                  );
                })}
              </div>
              <div className="mx-auto mt-4 grid w-36 grid-cols-3 gap-1 font-mono text-black">
                <span />
                <button type="button" onClick={() => movePony(-GRID_COLUMNS)} className="border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">▲</button>
                <span />
                <button type="button" onClick={() => movePony(-1)} className="border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">◀</button>
                <button type="button" onClick={() => movePony(GRID_COLUMNS)} className="border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">▼</button>
                <button type="button" onClick={() => movePony(1)} className="border-2 border-black bg-[#c7c7c7] py-2 shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">▶</button>
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
                <span className="text-5xl">📁</span>
                <div>
                  <strong className="block">responsible_financial_decisions</strong>
                  <span className="text-sm text-black/55">0 bytes. Last modified: never.</span>
                </div>
                <span className="text-5xl">📄</span>
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

        {activeWindow === "root" && (
          <WindowFrame title="CRITICAL SYSTEM EVENT" onClose={() => setActiveWindow(null)}>
            <div className="bg-[#ffef4a] p-8 text-center">
              <Horse size={82} weight="fill" className="mx-auto mb-5" />
              <h2 className="font-display text-4xl font-black leading-none">PONY ACHIEVED ROOT ACCESS</h2>
              <p className="mt-5 text-sm">It ate four carrots, disabled the firewall, and found the music directory.</p>
              <button type="button" onClick={() => router.push("/backstage")} className="mt-7 border-2 border-black bg-[#c7c7c7] px-5 py-3 font-mono text-xs font-bold shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">
                OPEN COMPROMISED AUDIO SUBSYSTEM
              </button>
            </div>
          </WindowFrame>
        )}

        <div className="absolute inset-x-0 bottom-0 flex h-12 items-center border-t-2 border-white bg-[#c7c7c7] px-2 shadow-[inset_0_2px_white]">
          <button type="button" onClick={() => openWindow("terminal")} className="flex h-9 items-center gap-2 border-2 border-black bg-[#c7c7c7] px-3 font-mono text-xs font-bold shadow-[inset_-2px_-2px_#555,inset_2px_2px_white]">
            🐴 START
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
