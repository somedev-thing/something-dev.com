"use client";

import Link from "next/link";
import { ArrowLeft, SpeakerHigh, SpeakerSlash, Warning } from "@phosphor-icons/react/dist/ssr";
import { Midi } from "@tonejs/midi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EXCERPT_START = 58.4;
const EXCERPT_END = 92;
const MIDI_TRACKS: Record<number, { type: OscillatorType; volume: number; octave?: number }> = {
  4: { type: "square", volume: 0.05, octave: 1 },
  10: { type: "sine", volume: 0.025 },
  12: { type: "triangle", volume: 0.035 },
  14: { type: "sawtooth", volume: 0.018 },
  20: { type: "square", volume: 0.045 },
  22: { type: "sawtooth", volume: 0.02 },
  24: { type: "sawtooth", volume: 0.02 },
  28: { type: "square", volume: 0.016 },
};

function scheduleTone(context: AudioContext, destination: AudioNode, frequency: number, start: number, duration: number, type: OscillatorType, volume: number) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function scheduleNoise(context: AudioContext, destination: AudioNode, start: number) {
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.05), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.value = 6500;
  gain.gain.setValueAtTime(0.035, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.05);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  source.start(start);
}

export default function Backstage() {
  const [showStarted, setShowStarted] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const stopShow = () => {
    audioRef.current?.close();
    audioRef.current = null;
    setShowStarted(false);
  };

  useEffect(() => {
    return () => {
      audioRef.current?.close();
    };
  }, []);

  const startShow = async () => {
    const context = new AudioContext();
    await context.resume();
    const response = await fetch("/audio/never-gonna-give-you-up.mid");
    if (!response.ok) {
      await context.close();
      throw new Error("The betrayal failed to load.");
    }
    const midi = new Midi(new Uint8Array(await response.arrayBuffer()));
    const master = context.createGain();
    const compressor = context.createDynamicsCompressor();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.48, context.currentTime + 0.12);
    master.connect(compressor);
    compressor.connect(context.destination);

    const start = context.currentTime + 0.08;
    Object.entries(MIDI_TRACKS).forEach(([trackIndex, voice]) => {
      midi.tracks[Number(trackIndex)].notes
        .filter((note) => note.time >= EXCERPT_START && note.time < EXCERPT_END)
        .forEach((note) => {
          const octaveMultiplier = voice.octave ? 2 ** voice.octave : 1;
          const frequency = 440 * 2 ** ((note.midi - 69) / 12) * octaveMultiplier;
          scheduleTone(
            context,
            master,
            frequency,
            start + note.time - EXCERPT_START,
            Math.min(note.duration * 0.92, 2.4),
            voice.type,
            voice.volume * Math.max(0.3, note.velocity)
          );
        });
    });

    const eighthNote = 60 / 113 / 2;
    for (let time = 0, beat = 0; time < EXCERPT_END - EXCERPT_START; time += eighthNote, beat += 1) {
      scheduleNoise(context, master, start + time);
      if (beat % 2 === 0) scheduleTone(context, master, 58, start + time, 0.09, "sine", 0.075);
    }

    audioRef.current = context;
    setShowStarted(true);
  };

  if (showStarted) {
    return (
      <main className="fixed inset-0 z-[100] overflow-hidden bg-[#ef233c] text-[#080808]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0,transparent_50px,rgba(255,255,255,.16)_50px,rgba(255,255,255,.16)_100px)] animate-[pulse_1s_ease-in-out_infinite]" />
        <div className="project-grid absolute inset-0 opacity-30" />

        <button
          type="button"
          onClick={stopShow}
          className="absolute right-5 top-5 z-20 flex items-center gap-2 rounded-full bg-black px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-105"
        >
          <SpeakerSlash size={17} weight="fill" /> Stop this nonsense
        </button>

        <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-5 rounded-full border-2 border-black/30 bg-white/20 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.24em]">
            No YouTube. No redirect. Pure local betrayal.
          </div>

          <motion.div
            animate={{ rotate: [-8, 8, -8], y: [0, -18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 0.48, repeat: Infinity }}
            className="mb-5 text-[7rem] leading-none drop-shadow-[12px_12px_0_rgba(0,0,0,.16)] md:text-[12rem]"
          >
            🕺
          </motion.div>

          <h1 className="max-w-6xl font-display text-5xl font-black leading-[0.82] tracking-[-0.075em] md:text-8xl lg:text-[8.5rem]">
            YOU HAVE BEEN
            <span className="block text-white drop-shadow-[7px_7px_0_#080808]">RICK-ADJACENTED.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-bold md:text-xl">
            The browser is synthesizing the chorus directly from your supplied MIDI. No stream, no redirect, and no escape from 113 BPM.
          </p>

          <div className="mt-10 flex h-24 items-end gap-1.5">
            {Array.from({ length: 32 }, (_, index) => (
              <motion.span
                key={index}
                className="w-2 bg-black md:w-3"
                animate={{ height: [`${18 + (index % 5) * 8}%`, `${65 + (index % 4) * 9}%`, `${22 + (index % 6) * 7}%`] }}
                transition={{ duration: 0.24 + (index % 5) * 0.035, repeat: Infinity, repeatType: "mirror" }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070707] px-6 pb-32 pt-36 text-white md:px-12 md:pt-44">
      <div className="project-grid absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ef233c]/15 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl">
        <Link href="/" className="mb-16 inline-flex items-center gap-2 font-nav text-sm font-bold text-white/45 transition-colors hover:text-white">
          <ArrowLeft /> Retreat while you still can
        </Link>

        <div className="rounded-[2.5rem] border border-red-400/20 bg-black/55 p-7 shadow-2xl backdrop-blur-sm md:p-14">
          <Warning size={46} weight="fill" className="mb-8 text-[#ef233c]" />
          <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#ef233c]">Backstage access granted</div>
          <h1 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.06em] md:text-8xl">
            THIS BUTTON IS A TERRIBLE IDEA.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/50">
            It will parse an entire MIDI, synthesize the chorus, and hijack the screen. It will not send you to YouTube because that would be lazy. Check your volume, warn the dog, and accept the consequences.
          </p>
          <button
            type="button"
            onClick={startShow}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#ef233c] px-6 py-4 font-nav font-black text-black transition-transform hover:scale-105"
          >
            <SpeakerHigh size={22} weight="fill" />
            Start the local betrayal
          </button>
          <div className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/20">
            User interaction required by browser policy and basic human decency
          </div>
        </div>
      </div>
    </main>
  );
}
