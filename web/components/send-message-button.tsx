"use client";

import { useState } from "react";
import { ShimmerText } from "@/components/shimmer-text";

const TELEGRAM_URL = "https://t.me/godsbattle";

export function SendMessageButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer noopener"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[15px] font-medium text-background"
    >
      {hovered ? (
        <ShimmerText
          duration={0.52}
          delay={0}
          style={{
            "--shimmer-contrast":
              "color-mix(in oklab, var(--foreground) 55%, transparent)",
          } as React.CSSProperties}
        >
          send message
        </ShimmerText>
      ) : (
        <span>send message</span>
      )}
    </a>
  );
}
