import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SiteHeader({ wide }: { wide?: boolean }) {
  return (
    <header
      className={`mx-auto px-6 pt-10 sm:pt-14 ${
        wide ? "max-w-[1080px]" : "max-w-[680px]"
      }`}
    >
      <Link
        href="/"
        className="group inline-flex items-center gap-2.5 text-muted hover:text-foreground"
      >
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-background ring-1 ring-border"
          style={{ viewTransitionName: "site-avatar" }}
        >
          <Image
            src="/avatar.webp"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-cover"
          />
        </span>
        <span className="inline-flex items-center gap-1.5 text-[14px] tracking-tight">
          <ArrowLeft
            aria-hidden
            className="h-3.5 w-3.5 text-muted/70 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
            strokeWidth={2}
          />
          <span className="text-foreground/80 group-hover:text-foreground">
            christian obanaka
          </span>
        </span>
      </Link>
    </header>
  );
}
