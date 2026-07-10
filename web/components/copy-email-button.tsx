"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Check, Copy } from "lucide-react";

const EMAIL = "christian@godsbattle.net";

/* Legacy path for when the async clipboard API is unavailable or denied
   (insecure context, embedded webviews): copy via a hidden textarea. */
function copyViaTextarea(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    let ok = true;
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      ok = copyViaTextarea(EMAIL);
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "email address copied" : "copy email address"}
      aria-live="polite"
      className="inline-flex min-w-[134px] items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[15px] font-medium text-foreground transition-colors duration-200 hover:bg-foreground/[0.04]"
    >
      <span aria-hidden className="relative h-[14px] w-[14px]">
        <LazyMotion features={domAnimation} strict>
          <AnimatePresence initial={false}>
            <m.span
              key={copied ? "tick" : "copy"}
              className="absolute inset-0 grid place-items-center"
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              {copied ? (
                <Check className="h-[14px] w-[14px]" strokeWidth={2} />
              ) : (
                <Copy className="h-[14px] w-[14px]" strokeWidth={2} />
              )}
            </m.span>
          </AnimatePresence>
        </LazyMotion>
      </span>
      <span>{copied ? "copied" : "copy email"}</span>
    </button>
  );
}
