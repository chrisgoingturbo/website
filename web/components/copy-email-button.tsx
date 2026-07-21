"use client";

import { useState } from "react";
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
      className="inline-flex min-h-11 min-w-[134px] items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[15px] font-medium text-foreground hover:bg-foreground/[0.04]"
    >
      <span aria-hidden className="grid size-[14px] place-items-center">
        {copied ? (
          <Check className="size-[14px]" strokeWidth={2} />
        ) : (
          <Copy className="size-[14px]" strokeWidth={2} />
        )}
      </span>
      <span>{copied ? "copied" : "copy email"}</span>
    </button>
  );
}
