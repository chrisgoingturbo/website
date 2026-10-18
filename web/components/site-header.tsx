import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";

export function SiteHeader({ wide }: { wide?: boolean }) {
  return (
    <header
      className={`mx-auto px-6 pt-10 sm:pt-14 ${
        wide ? "max-w-[1080px]" : "max-w-[680px]"
      }`}
    >
      <Link
        href="/"
        className="group -my-2 inline-flex min-h-11 items-center py-2 text-muted hover:text-foreground"
      >
        <span className="inline-flex items-center gap-1.5 text-[14px]">
          <HugeiconsIcon icon={ArrowLeft02Icon}
            aria-hidden
            className="h-3.5 w-3.5 text-muted/70 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
            strokeWidth={2}
          />
          <span className="text-foreground/80 group-hover:text-foreground">
            Home
          </span>
        </span>
      </Link>
    </header>
  );
}
