"use client";

import { useCallback, useEffect, useState, useRef } from "react";

const CHARS = "-_~=+*!@#$%^&()[]{}|;:,.<>?/";

interface ScrambleTextProps {
  text: string;
  className?: string;
  hover?: boolean;
  speed?: number;
}

export function ScrambleText({ text, className = "", hover = true, speed = 30 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isScrambling = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        isScrambling.current = false;
      }

      iteration += 1 / 2; // Scramble speed factor
    }, speed);
  }, [speed, text]);

  useEffect(() => {
    // Initial scramble on mount if not hover-only
    if (!hover) scramble();
    return () => clearInterval(intervalRef.current!);
  }, [hover, scramble]);

  return (
    <span 
      className={className} 
      onMouseEnter={hover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
}
