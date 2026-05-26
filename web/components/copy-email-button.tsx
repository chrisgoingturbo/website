"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { MailFilledIcon } from "@/components/brand-icons";

const EMAIL = "christian@godsbattle.net";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API blocked (insecure context, denied permission) — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "email address copied" : "copy email address"}
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[15px] font-medium text-foreground transition-colors duration-200 hover:bg-foreground/[0.04]"
    >
      {copied ? (
        <Check className="h-[14px] w-[14px]" weight="bold" aria-hidden />
      ) : (
        <MailFilledIcon className="h-[14px] w-[14px]" />
      )}
      <span>{copied ? "copied" : "copy email"}</span>
    </button>
  );
}
