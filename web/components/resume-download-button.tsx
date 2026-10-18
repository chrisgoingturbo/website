"use client";

import { useState, type MouseEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download04Icon,
  Loading03Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

type DownloadStatus = "idle" | "downloading" | "complete";

export function ResumeDownloadButton() {
  const [status, setStatus] = useState<DownloadStatus>("idle");

  function handleDownload(event: MouseEvent<HTMLAnchorElement>) {
    if (status === "downloading") {
      event.preventDefault();
      return;
    }

    if (status === "idle") {
      setStatus("downloading");
      window.setTimeout(() => setStatus("complete"), 900);
    }
  }

  const statusLabel =
    status === "idle"
      ? "Download"
      : status === "downloading"
        ? "Downloading"
        : "Downloaded";

  return (
    <a
      href="/downloads/christian-obanaka-resume.pdf"
      download
      aria-label={
        status === "complete"
          ? "Résumé downloaded. Download again"
          : "Download résumé as PDF"
      }
      aria-busy={status === "downloading"}
      data-status={status}
      onClick={handleDownload}
      className="resume-download-button inline-flex min-h-9 min-w-[112px] shrink-0 items-center justify-center rounded-full border border-border bg-card px-3.5 py-2 text-[14px] font-medium text-foreground hover:border-foreground/20 hover:bg-foreground/[0.035]"
    >
      <span aria-hidden className="resume-download-visual">
        <span
          data-active={status === "idle"}
          className="resume-download-state"
        >
          <HugeiconsIcon icon={Download04Icon} size={16} strokeWidth={1.8} />
          Download
        </span>
        <span
          data-active={status === "downloading"}
          className="resume-download-state"
        >
          <HugeiconsIcon
            icon={Loading03Icon}
            size={16}
            strokeWidth={1.8}
            className="animate-spin motion-reduce:animate-none"
          />
          Downloading
        </span>
        <span
          data-active={status === "complete"}
          className="resume-download-state"
        >
          <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2} />
          Downloaded
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {statusLabel}
      </span>
    </a>
  );
}
