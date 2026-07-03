"use client";

import { Midi } from "@tonejs/midi";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MIDI_TRACKS: Record<number, { type: OscillatorType; volume: number; octave?: number; label: string }> = {
  4: { type: "square", volume: 0.042, octave: 1, label: "Lead" },
  10: { type: "sine", volume: 0.02, label: "Choir" },
  12: { type: "triangle", volume: 0.03, label: "Electric keys" },
  14: { type: "sawtooth", volume: 0.015, label: "Strings" },
  16: { type: "sine", volume: 0.014, label: "Synth voice" },
  20: { type: "square", volume: 0.035, label: "Bass" },
  22: { type: "sawtooth", volume: 0.016, label: "Brass L" },
  24: { type: "sawtooth", volume: 0.016, label: "Brass R" },
  26: { type: "sawtooth", volume: 0.024, label: "Synth lead" },
  28: { type: "square", volume: 0.012, label: "Muted guitar" },
  30: { type: "triangle", volume: 0.014, label: "Clean guitar" },
};

type AudioEvent = {
  kind: "tone" | "noise";
  time: number;
  duration: number;
  frequency: number;
  velocity: number;
  type: OscillatorType;
  volume: number;
};

function scheduleTone(context: AudioContext, destination: AudioNode, event: AudioEvent, start: number) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = event.type;
  oscillator.frequency.setValueAtTime(event.frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(event.volume * Math.max(0.25, event.velocity), start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + event.duration);
  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(start);
  oscillator.stop(start + event.duration + 0.025);
}

function scheduleNoise(context: AudioContext, destination: AudioNode, start: number, volume: number) {
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.045), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.value = 6200;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(start);
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function Backstage() {
  const router = useRouter();
  const audioRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const progressRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(213.7);
  const [loopCount, setLoopCount] = useState(0);

  const stopAudio = useCallback(() => {
    if (schedulerRef.current) window.clearInterval(schedulerRef.current);
    if (progressRef.current) window.clearInterval(progressRef.current);
    schedulerRef.current = null;
    progressRef.current = null;
    audioRef.current?.close();
    audioRef.current = null;
  }, []);

  const startShow = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.resume();
      setStarted(true);
      return;
    }

    setLoading(true);
    const context = new AudioContext();
    audioRef.current = context;
    const response = await fetch("/audio/never-gonna-give-you-up.mid");
    if (!response.ok) {
      await context.close();
      audioRef.current = null;
      setLoading(false);
      return;
    }

    const midi = new Midi(new Uint8Array(await response.arrayBuffer()));
    const songDuration = midi.duration;
    const master = context.createGain();
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -16;
    compressor.knee.value = 18;
    compressor.ratio.value = 7;
    compressor.attack.value = 0.004;
    compressor.release.value = 0.22;
    master.gain.value = 0.68;
    master.connect(compressor);
    compressor.connect(context.destination);

    const events: AudioEvent[] = [];
    Object.entries(MIDI_TRACKS).forEach(([trackIndex, voice]) => {
      midi.tracks[Number(trackIndex)].notes.forEach((note) => {
        const octaveMultiplier = voice.octave ? 2 ** voice.octave : 1;
        events.push({
          kind: "tone",
          time: note.time,
          duration: Math.max(0.035, Math.min(note.duration * 0.9, 2.8)),
          frequency: 440 * 2 ** ((note.midi - 69) / 12) * octaveMultiplier,
          velocity: note.velocity,
          type: voice.type,
          volume: voice.volume,
        });
      });
    });

    const eighthNote = 60 / 113 / 2;
    for (let time = 0, beat = 0; time < songDuration; time += eighthNote, beat += 1) {
      events.push({
        kind: beat % 2 === 0 ? "tone" : "noise",
        time,
        duration: 0.075,
        frequency: 56,
        velocity: 1,
        type: "sine",
        volume: beat % 2 === 0 ? 0.052 : 0.022,
      });
    }
    events.sort((a, b) => a.time - b.time);

    void context.resume();
    const playbackOrigin = context.currentTime + 0.12;
    let loopStart = playbackOrigin;
    let eventIndex = 0;
    let completedLoops = 0;

    const scheduleAhead = () => {
      const horizon = context.currentTime + 1.4;
      while (loopStart + events[eventIndex].time < horizon) {
        const event = events[eventIndex];
        const eventStart = loopStart + event.time;
        if (eventStart >= context.currentTime - 0.05) {
          if (event.kind === "noise") scheduleNoise(context, master, eventStart, event.volume);
          else scheduleTone(context, master, event, eventStart);
        }

        eventIndex += 1;
        if (eventIndex >= events.length) {
          eventIndex = 0;
          loopStart += songDuration;
          completedLoops += 1;
          setLoopCount(completedLoops);
        }
      }
    };

    scheduleAhead();
    schedulerRef.current = window.setInterval(scheduleAhead, 420);
    progressRef.current = window.setInterval(() => {
      const elapsed = Math.max(0, context.currentTime - playbackOrigin);
      setPosition(elapsed % songDuration);
    }, 150);

    setDuration(songDuration);
    setLoading(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void startShow(), 0);
    return () => {
      window.clearTimeout(timer);
      stopAudio();
    };
  }, [startShow, stopAudio]);

  const exit = () => {
    stopAudio();
    router.push("/horse.exe");
  };

  const progress = duration ? (position / duration) * 100 : 0;

  return (
    <main
      onPointerDown={() => {
        if (audioRef.current?.state === "suspended") void audioRef.current.resume();
      }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#111028] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#ff416c_0,#55215e_30%,#111028_68%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(0,0,0,.35)_4px)]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 [background:repeating-conic-gradient(from_0deg,rgba(255,255,255,.06)_0deg_8deg,transparent_8deg_20deg)]"
      />

      <div className="relative flex h-full flex-col p-4 md:p-7">
        <header className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/55 md:text-[10px]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300 shadow-[0_0_14px_#a3e635]" />
            MIDI incident in progress
          </div>
          <button type="button" onClick={exit} className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black">
            <SpeakerSlash size={15} weight="fill" /> Kill audio and retreat
          </button>
        </header>

        <div className="grid min-h-0 flex-1 items-center gap-6 py-5 lg:grid-cols-[1fr_minmax(260px,0.48fr)_1fr]">
          <div className="relative z-10">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#ffcf4a]">PonyOS Audio Subsystem / Armed</div>
            <h1 className="font-display text-[clamp(3.7rem,8.2vw,9rem)] font-black leading-[0.78] tracking-[-0.075em]">
              NEVER<br />
              GONNA GIVE<br />
              <span className="text-[#ffcf4a]">YOU AN EXIT.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/55 md:text-lg">
              The complete 3:34 MIDI arrangement is being synthesized in real time, then looped until morale improves.
            </p>
          </div>

          <div className="relative hidden h-[56vh] min-h-[360px] items-end justify-center lg:flex">
            <div className="absolute inset-x-0 bottom-0 h-20 rounded-[50%] bg-black/50 blur-xl" />
            <div className="absolute left-1/2 top-0 h-full w-64 -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(255,241,160,.38),transparent_75%)] [clip-path:polygon(42%_0,58%_0,100%_100%,0_100%)]" />
            <motion.div
              animate={{ x: [-18, 20, -18], rotate: [-3, 4, -3] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-12 h-72 w-40 origin-bottom"
            >
              <div className="absolute left-1/2 top-0 h-16 w-14 -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute left-1/2 top-14 h-40 w-24 -translate-x-1/2 rounded-t-[45%] bg-black [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]" />
              <motion.div animate={{ rotate: [-38, -8, -38] }} transition={{ duration: 0.45, repeat: Infinity }} className="absolute left-1 top-20 h-24 w-5 origin-top rounded-full bg-black" />
              <motion.div animate={{ rotate: [38, 8, 38] }} transition={{ duration: 0.45, repeat: Infinity }} className="absolute right-1 top-20 h-24 w-5 origin-top rounded-full bg-black" />
              <motion.div animate={{ rotate: [-8, 10, -8] }} transition={{ duration: 0.45, repeat: Infinity }} className="absolute bottom-0 left-10 h-28 w-6 origin-top rounded-full bg-black" />
              <motion.div animate={{ rotate: [8, -10, 8] }} transition={{ duration: 0.45, repeat: Infinity }} className="absolute bottom-0 right-10 h-28 w-6 origin-top rounded-full bg-black" />
              <div className="absolute -right-8 top-9 h-16 w-3 rotate-[-12deg] rounded-full bg-black" />
              <div className="absolute -right-10 top-6 h-6 w-6 rounded-full border-4 border-black" />
            </motion.div>
          </div>

          <aside className="relative z-10 grid grid-cols-2 gap-3 self-end lg:grid-cols-1">
            <div className="border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Source file</div>
              <div className="mt-1 truncate text-sm font-bold">never-gonna-give-you-up.mid</div>
            </div>
            <div className="border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Arrangement</div>
              <div className="mt-1 text-sm font-bold">11 synthesized voices / 113 BPM</div>
            </div>
            <div className="border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Loop count</div>
              <div className="mt-1 text-sm font-bold">{loopCount} completed / ∞ threatened</div>
            </div>
            <div className="border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">Browser courage</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-bold">
                {started ? <SpeakerHigh weight="fill" className="text-lime-300" /> : <SpeakerSlash weight="fill" className="text-red-300" />}
                {loading ? "Parsing betrayal..." : started ? "Compromised" : "Click anywhere"}
              </div>
            </div>
          </aside>
        </div>

        <footer className="border-t border-white/20 pt-4">
          <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
            <span>{formatTime(position)}</span>
            <span className="hidden md:block">No external player. No redirect. No mercy.</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff416c] via-[#ffcf4a] to-lime-300 transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 hidden flex-wrap gap-2 md:flex">
            {Object.values(MIDI_TRACKS).map((track) => (
              <span key={track.label} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                {track.label}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
