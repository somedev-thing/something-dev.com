import { 
  GithubLogo, 
  DiscordLogo, 
  InstagramLogo, 
  YoutubeLogo, 
  TiktokLogo, 
  Coffee, 
  Heart 
} from "@phosphor-icons/react/dist/ssr";

export const config = {
  identity: {
    name: "Dustin",
    siteName: "something-dev.com",
    email: "dustin@something-dev.com", 
    repo: "https://github.com/somedev-thing/something-dev.com",
  },

  nav: [
    { name: "Work", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Setup", href: "/uses" },
    { name: "Archive", href: "/graveyard" },
  ],
  
  socials: [
    { name: "GitHub", url: "https://github.com/somedev-thing", icon: GithubLogo, username: "@somedev-thing" },
    { name: "Discord", url: "https://discord.com", icon: DiscordLogo, username: "nyra.lol" },
    { name: "Instagram", url: "https://instagram.com/lordofponys", icon: InstagramLogo, username: "@lordofponys" },
    { name: "YouTube", url: "https://youtube.com/@lordofponys", icon: YoutubeLogo, username: "@lordofponys" },
    { name: "TikTok", url: "https://tiktok.com/@lordofponys", icon: TiktokLogo, username: "@lordofponys" },
  ],

  support: [
    { name: "Buy Me a Coffee", url: "https://buymeacoffee.com/somedevthing", icon: Coffee },
    { name: "Ko-fi", url: "https://ko-fi.com/somedevthing", icon: Heart },
  ]
};