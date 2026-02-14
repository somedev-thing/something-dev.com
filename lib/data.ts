import { MagicWand, TerminalWindow, Cpu, Lightning } from "@phosphor-icons/react/dist/ssr";

export const TOOLKIT = [
    { title: "Frontend", tools: "React 19, Next.js (App Router), Framer Motion, Tailwind V4", icon: MagicWand },
    { title: "Backend", tools: "Node.js, PostgreSQL, Supabase Edge Functions, Redis", icon: TerminalWindow },
    { title: "Hardware", tools: "ESP32, C++, IoT Protocols, High Voltage (Careful)", icon: Cpu },
    { title: "Legacy", tools: "Optimizing for 2015 Mac Pros and constrained environments.", icon: Lightning },
];

export const TIMELINE = [
    { year: "2018-2022", role: "Master Electrician / L.D.", desc: "Ran lighting for over 200 live productions. Zero show-stopping failures.", icon: "Fire" },
    { year: "2022-2024", role: "Creative Technologist", desc: "Building interactive installations and weird web experiments.", icon: "Circuitry" },
    { year: "2024-Present", role: "Fullstack Engineer", desc: "Shipping production code. Fighting legacy hardware constraints.", icon: "Terminal" },
];
