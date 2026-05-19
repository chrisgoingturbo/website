import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "free downloads",
  description:
    "chart colors, notion templates, and other small things i've made.",
};

type Item = {
  title: string;
  blurb: string;
  href?: string;
  icon: ReactNode;
  status?: "soon";
};

const items: Item[] = [
  {
    title: "chart colors",
    blurb:
      "monochrome and neon palettes i use for futures charts. drop-in for tradingview and tradingview-style style pickers.",
    icon: (
      <Image
        src="/tradingview-logo.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 dark:invert"
      />
    ),
    status: "soon",
  },
  {
    title: "notion templates",
    blurb:
      "the trade journal + community ops templates i actually use. nothing fancy — just the bits that survive a quarter.",
    icon: (
      <Image
        src="/notion-logo.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 dark:invert"
      />
    ),
    status: "soon",
  },
  {
    title: "more soon",
    blurb:
      "i drop small things here whenever i build something that's useful enough to share.",
    icon: <Sparkles aria-hidden className="h-8 w-8" strokeWidth={1.5} />,
    status: "soon",
  },
];

export default function FreePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[680px] px-6 pt-16 pb-32 sm:pt-20">
        <header>
          <h1 className="text-[28px] font-medium tracking-tight text-foreground sm:text-[32px]">
            free downloads
          </h1>
          <p className="mt-2 text-[15px] leading-[1.65] text-muted">
            small things i&rsquo;ve made and decided to give away. no signup,
            no email gate.
          </p>
        </header>

        <ul className="mt-14 space-y-3">
          {items.map((item) => (
            <li key={item.title}>
              <DownloadRow item={item} />
            </li>
          ))}
        </ul>

        <footer className="mt-20 text-[14px] text-muted">
          <p>
            want a specific template?{" "}
            <a
              href="mailto:christian@godsbattle.net"
              className="text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground"
            >
              ping me
            </a>
            .
          </p>
        </footer>
      </main>
    </>
  );
}

function DownloadRow({ item }: { item: Item }) {
  const isSoon = item.status === "soon";
  const className = [
    "card-shadow group flex w-full items-center gap-4 rounded-xl bg-card p-4 sm:p-5",
    isSoon ? "cursor-default opacity-70" : "",
  ].join(" ");

  const inner = (
    <>
      <span
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted/15 text-foreground/85"
      >
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[14.5px] font-medium tracking-tight text-foreground">
          {item.title}
          {isSoon ? (
            <span className="rounded-full border border-border px-2 py-[1px] text-[10px] uppercase tracking-[0.12em] text-muted">
              soon
            </span>
          ) : null}
        </p>
        <p className="mt-1 text-[14px] leading-snug text-muted">{item.blurb}</p>
      </div>
      {!isSoon ? (
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-muted transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if (isSoon || !item.href) {
    return (
      <div className={className} aria-disabled>
        {inner}
      </div>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {inner}
    </Link>
  );
}
