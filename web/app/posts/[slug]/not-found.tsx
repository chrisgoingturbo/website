import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[620px] px-6 pt-20 pb-32 sm:pt-28">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          404
        </p>
        <h1 className="mt-3 text-[28px] font-medium leading-[1.15] tracking-tight text-foreground">
          this post doesn&rsquo;t live here.
        </h1>
        <p className="mt-4 text-[15px] leading-[1.7] text-muted">
          the url might be old, or i moved it.
        </p>
        <div className="mt-8 flex items-center gap-6 text-[14px]">
          <Link
            href="/posts/"
            className="group inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden
              className="h-3.5 w-3.5 text-muted/70 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
            all writing
          </Link>
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground"
          >
            home
          </Link>
        </div>
      </main>
    </>
  );
}
