import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "free",
  description:
    "chart colors, notion templates, and other small things i've made.",
};

type Product = {
  slug: string;
  title: string;
  blurb: string;
  format: string;
  thumbnail: ReactNode;
  status: "soon" | "available";
  notifyEmail?: string;
};

const products: Product[] = [
  {
    slug: "chart-colors",
    title: "chart colors",
    blurb:
      "monochrome and neon palettes i use for futures charts. drop-in for tradingview style pickers.",
    format: "tradingview · json",
    thumbnail: (
      <Image
        src="/tradingview-logo.svg"
        alt=""
        width={96}
        height={96}
        className="h-20 w-20 object-contain dark:invert"
      />
    ),
    status: "soon",
    notifyEmail: "chart colors",
  },
  {
    slug: "notion-templates",
    title: "notion templates",
    blurb:
      "the trade journal and community ops templates i actually use. the bits that survive a quarter.",
    format: "notion · duplicate link",
    thumbnail: (
      <Image
        src="/notion-logo.svg"
        alt=""
        width={88}
        height={88}
        className="h-[72px] w-[72px] object-contain dark:invert"
      />
    ),
    status: "soon",
    notifyEmail: "notion templates",
  },
];

export default function FreePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1080px] px-6 pt-16 pb-32 sm:pt-20">
        <header className="mx-auto max-w-[680px]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            free
          </p>
          <h1 className="mt-3 text-[28px] font-medium tracking-tight text-foreground sm:text-[34px]">
            small things, given away.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.65] text-muted">
            no signup, no email gate. one click, you have it.
          </p>
        </header>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>

        <footer className="mx-auto mt-20 max-w-[680px] text-[14px] text-muted">
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

function ProductCard({ product }: { product: Product }) {
  const isSoon = product.status === "soon";
  const cta = isSoon
    ? {
        href: `mailto:christian@godsbattle.net?subject=${encodeURIComponent(
          `notify me: ${product.notifyEmail ?? product.title}`,
        )}`,
        label: "notify me",
      }
    : { href: `/free/${product.slug}/`, label: "download" };

  return (
    <article className="card-shadow group flex h-full flex-col overflow-hidden rounded-2xl bg-card transition-shadow duration-200 ease-out">
      <div className="relative flex h-[180px] w-full items-center justify-center bg-muted/10">
        {product.thumbnail}
        <span className="absolute left-4 top-4 rounded-full bg-accent-soft px-2.5 py-[3px] text-[11px] font-medium uppercase tracking-[0.08em] text-accent">
          free
        </span>
        {isSoon ? (
          <span className="absolute right-4 top-4 rounded-full border border-border bg-card px-2.5 py-[3px] text-[11px] uppercase tracking-[0.08em] text-muted">
            soon
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted tabular-nums">
          {product.format}
        </p>
        <h2 className="text-[17px] font-medium tracking-tight text-foreground">
          {product.title}
        </h2>
        <p className="text-[14px] leading-[1.55] text-muted">{product.blurb}</p>
        <div className="mt-3 flex items-center justify-between">
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background transition-colors duration-200 hover:bg-foreground/85"
          >
            {cta.label}
          </a>
          <span className="text-[13px] tabular-nums text-muted">$0</span>
        </div>
      </div>
    </article>
  );
}
