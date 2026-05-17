"use client";

import { useEffect } from "react";

export function YouTubeLite() {
  useEffect(() => {
    void import("lite-youtube-embed");
  }, []);
  return null;
}
