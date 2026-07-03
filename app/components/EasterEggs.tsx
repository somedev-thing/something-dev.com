"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function EasterEggs() {
  const router = useRouter();

  useEffect(() => {
    let typed = "";
    let konamiPosition = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        typed = `${typed}${event.key.toLowerCase()}`.slice(-12);
        if (typed.endsWith("rick")) {
          typed = "";
          router.push("/backstage");
        }
      }

      if (event.key === KONAMI[konamiPosition]) {
        konamiPosition += 1;
        if (konamiPosition === KONAMI.length) {
          konamiPosition = 0;
          router.push("/horse.exe");
        }
      } else {
        konamiPosition = event.key === KONAMI[0] ? 1 : 0;
      }
    };

    console.info(
      "%cYOU FOUND THE BORING EASTER EGG",
      "font-size:18px;font-weight:900;color:#ff5c35;background:#070707;padding:8px 12px;"
    );
    console.info("The better one is four letters long. Your keyboard already knows them.");

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
