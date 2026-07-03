"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code,
  DiscordLogo,
  Globe,
  Lightning,
  Newspaper,
  Play,
} from "@phosphor-icons/react/dist/ssr";
import { config } from "@/lib/config";
import { SpotlightHero } from "./SpotlightHero";

const projects = [
  {
    number: "01",
    title: "nordverkehr.xyz",
    role: "Website + infrastructure",
    description: "A German FiveM roleplay city with a public face that feels alive and infrastructure built to keep it that way.",
    href: "https://nordverkehr.xyz",
    color: "#ff4938",
    icon: Globe,
    tags: ["FiveM", "Web", "Operations"],
  },
  {
    number: "02",
    title: "atlasmods.org",
    role: "Minecraft plugins + mods",
    description: "Minecraft software so good there is no plausible reason for it to be free. Yet here we are.",
    href: "https://atlasmods.org",
    color: "#4f8cff",
    icon: Code,
    tags: ["Minecraft", "Java", "Free"],
  },
  {
    number: "03",
    title: "vye.lol",
    role: "Discord bot",
    description: "nyra.lol's better successor. Free, polished, and so good it may have unintended physiological side effects.",
    href: "https://vye.lol",
    color: "#a970ff",
    icon: DiscordLogo,
    tags: ["Discord", "Automation", "Free"],
  },
  {
    number: "04",
    title: "bohlser-buehne.de",
    role: "Theater landing page",
    description: "A local theater site made in seven hours overnight with lots of Pepsi and opening-night urgency.",
    href: "https://bohlser-buehne.de",
    color: "#f5c84b",
    icon: Play,
    tags: ["Theater", "Design", "7 hours"],
  },
];

const capabilities = [
  ["01", "Web", "Fast interfaces with a pulse"],
  ["02", "Infra", "The unglamorous parts that keep working"],
  ["03", "Bots", "Useful automation without the beige"],
  ["04", "Stage", "Software that understands showtime"],
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

interface HomeContentProps {
  posts: {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
  }[];
}

export function HomeContent({ posts }: HomeContentProps) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#070707] text-white">
      <SpotlightHero />

      <section id="work" className="px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1500px]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1fr_32rem] lg:items-end"
          >
            <div>
              <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff5c35]">Selected systems / 2026</div>
              <h2 className="font-display text-6xl font-black leading-[0.88] tracking-[-0.06em] md:text-8xl lg:text-9xl">
                OUT IN THE<br />
                <span className="text-white/20">REAL WORLD.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-white/50 md:text-xl">
              No imaginary redesigns. No tasteful mockups of apps that do not exist. These are live things for real communities with real users and very real ways to break them.
            </p>
          </motion.div>

          <div>
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-70px" }}
                >
                  <Link
                    href={project.href}
                    target="_blank"
                    className="group relative block overflow-hidden border-b border-white/10 py-9 md:py-12"
                  >
                    <div
                      className="absolute inset-0 -translate-x-full opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, ${project.color}16, transparent 70%)` }}
                    />
                    <div className="relative grid items-start gap-7 md:grid-cols-[4rem_minmax(14rem,0.8fr)_minmax(18rem,1fr)_auto] md:items-center">
                      <span className="font-mono text-xs tracking-[0.2em] text-white/25">{project.number}</span>

                      <div>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: project.color }}>
                          {project.role}
                        </div>
                        <h3 className="font-display text-3xl font-black tracking-[-0.045em] text-white md:text-4xl lg:text-5xl">
                          {project.title}
                        </h3>
                      </div>

                      <div>
                        <p className="max-w-2xl text-base leading-relaxed text-white/48 md:text-lg">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 md:justify-end">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
                          style={{ color: project.color, borderColor: `${project.color}55`, backgroundColor: `${project.color}0d` }}
                        >
                          <Icon size={22} weight="fill" />
                        </span>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                          <ArrowUpRight size={20} weight="bold" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end">
            <Link href="/projects" className="group inline-flex items-center gap-3 font-nav font-bold text-white/50 transition-colors hover:text-white">
              Everything else that escaped localhost
              <ArrowRight weight="bold" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0b0b] px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#a3e635]">Operating principle</div>
            <h2 className="max-w-5xl font-display text-5xl font-black leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[6.8rem]">
              I TURN CAFFEINE-FREE SODA INTO
              <span className="text-[#a3e635]"> INFRASTRUCTURE.</span>
            </h2>
            <p className="mt-9 max-w-2xl text-xl leading-relaxed text-white/48">
              Theater taught me that deadlines are real, audiences are impatient, and “works on my machine” is not a recovery plan.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="self-end"
          >
            {capabilities.map(([number, title, copy]) => (
              <div key={title} className="grid grid-cols-[2.5rem_5rem_1fr] gap-4 border-t border-white/10 py-5 last:border-b">
                <span className="font-mono text-[10px] text-white/25">{number}</span>
                <strong className="font-display text-lg text-white">{title}</strong>
                <span className="text-sm leading-relaxed text-white/40">{copy}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1500px]">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#a970ff]">
                <Newspaper size={15} weight="fill" /> Field notes
              </div>
              <h2 className="font-display text-6xl font-black tracking-[-0.06em] md:text-8xl">LATEST DAMAGE.</h2>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-3 font-nav font-bold text-white/45 transition-colors hover:text-white">
              All transmissions <ArrowRight className="transition-transform group-hover:translate-x-1" weight="bold" />
            </Link>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            {posts.slice(0, 2).map((post, index) => (
              <motion.div key={post.slug} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-70px" }}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 p-8 transition-colors hover:border-white/25 md:p-10 ${
                    index === 0 ? "bg-[#101010]" : "bg-[#0a0a0a]"
                  }`}
                >
                  <div className={`absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[110px] ${index === 0 ? "bg-[#a970ff]/20" : "bg-[#4f8cff]/15"}`} />
                  <div className="relative flex items-center justify-between">
                    <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">{post.category}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">{post.date}</span>
                  </div>
                  <div className="relative">
                    <h3 className={`font-display font-black leading-[0.98] tracking-[-0.045em] text-white ${index === 0 ? "text-4xl md:text-6xl" : "text-4xl"}`}>
                      {post.title}
                    </h3>
                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/45 md:text-lg">{post.excerpt}</p>
                    <div className="mt-8 inline-flex items-center gap-2 font-nav text-sm font-bold text-white">
                      Read without adult supervision
                      <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" weight="bold" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-[#ff5c35] px-7 py-16 text-black md:px-14 md:py-24"
        >
          <Lightning className="absolute -right-10 -top-20 h-80 w-80 rotate-12 text-black/10 md:h-[34rem] md:w-[34rem]" weight="fill" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-black/55">You have a weird problem?</div>
              <h2 className="max-w-5xl font-display text-5xl font-black leading-[0.9] tracking-[-0.06em] md:text-8xl lg:text-9xl">
                GOOD. THOSE ARE THE FUN ONES.
              </h2>
            </div>
            <Link href={`mailto:${config.identity.email}`} className="group inline-flex w-fit items-center gap-3 rounded-full bg-black px-6 py-4 font-nav font-bold text-white transition-transform hover:scale-105">
              Start something <ArrowUpRight weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="relative mt-16 flex flex-wrap gap-x-8 gap-y-4 border-t border-black/20 pt-7">
            {config.socials.map((social) => (
              <Link key={social.name} href={social.url} target="_blank" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black/55 transition-colors hover:text-black">
                <social.icon size={16} weight="fill" /> {social.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
