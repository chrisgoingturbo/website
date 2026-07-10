import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { siGithub, siYoutube } from "simple-icons";
import { BrandIcon } from "@/components/brand-icon";
import { getAllPostMeta, type PostMeta } from "@/lib/posts";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SendMessageButton } from "@/components/send-message-button";

export default async function Home() {
  const allPosts = await getAllPostMeta();
  const posts = allPosts.slice(0, 6);

  return (
    <main id="main" className="mx-auto max-w-[680px] px-6 pt-16 pb-32 sm:pt-24">
      <header className="flex items-center gap-4">
        <Image
          src="/avatar.webp"
          alt=""
          width={56}
          height={56}
          priority
          className="h-14 w-14 rounded-full ring-1 ring-border"
          style={{ viewTransitionName: "site-avatar" }}
        />
        <div className="leading-tight">
          <h1 className="text-[18px] font-medium tracking-tight text-foreground">
            Christian Obanaka{" "}
            <span className="font-normal text-muted">(a.k.a chrisgoingturbo)</span>
          </h1>
          <p className="mt-1 text-[15px] font-medium text-muted">
            head of community at thePropTrade
          </p>
        </div>
      </header>

      <section className="mt-10 space-y-5 text-[15px] leading-[1.75] text-foreground/80">
        <p>
          i&rsquo;m head of community at{" "}
          <ProseLink href="https://theproptrade.com">
            <Image
              src="/theproptrade-logo.svg"
              alt=""
              width={18}
              height={18}
              className="-mt-px inline-block h-[18px] w-[18px] self-center dark:invert"
            />
            thePropTrade
          </ProseLink>
          , a prop firm built on real market experience and transparent rules.
          day to day i scale the community, drive organic engagement, and shape
          an intimate space traders <em>actually feel</em> at home in.
        </p>
        <p>
          previously, i scaled the discord community at{" "}
          <ProseLink href="https://pipfarm.com">
            <Image
              src="/pipfarm-logo.svg"
              alt=""
              width={18}
              height={18}
              className="-mt-px inline-block h-[18px] w-[18px] self-center dark:invert"
            />
            PipFarm
          </ProseLink>{" "}
          from 5k to 10k in five months, and worked with{" "}
          <Link
            href="/resume/"
            className="font-medium text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground"
          >
            a few other companies
          </Link>{" "}
          before that. you can reach me on{" "}
          <ProseLink href="https://x.com/chrisgoingturbo">
            @chrisgoingturbo
          </ProseLink>{" "}
          and via{" "}
          <ProseLink href="mailto:christian@godsbattle.net">email</ProseLink>{" "}
          or see my code on{" "}
          <ProseLink href="https://github.com/chrisgoingturbo">
            <BrandIcon
              icon={siGithub}
              size={14}
              className="-mt-px inline-block self-center text-foreground/85"
            />
            github
          </ProseLink>
          .
        </p>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <SendMessageButton />
        <CopyEmailButton />
      </div>

      <section aria-labelledby="projects-heading" className="mt-20">
        <h2 id="projects-heading" className="text-[15px] font-medium tracking-tight text-foreground">
          projects
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ProjectCard
            href="/trackmyprop/"
            name="trackmyprop"
            subtitle="portfolio tracker for prop firm traders."
            logo={
              <Image
                src="/trackmyprop-logo.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain dark:invert"
              />
            }
          />
          <ProjectCard
            href="https://youtube.com/godsbattle"
            external
            name="godsbattle"
            subtitle="pc optimization & tech tutorials on youtube."
            logo={<BrandIcon icon={siYoutube} size={24} />}
          />
        </div>
      </section>

      <section aria-labelledby="writing-heading" className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 id="writing-heading" className="text-[15px] font-medium tracking-tight text-foreground">
            writing
          </h2>
          <Link
            href="/posts/"
            className="group inline-flex items-center gap-1 text-[14px] text-muted hover:text-foreground"
          >
            all {allPosts.length}
            <ArrowUpRight
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
        {posts[0] ? <FeaturedPost post={posts[0]} /> : null}
        <ul className="mt-3 divide-y divide-border">
          {posts.slice(1).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}/`}
                className="group -mx-2 flex items-baseline justify-between gap-4 rounded-2xl px-2 py-3.5 hover:bg-foreground/[0.04]"
              >
                <p className="min-w-0 flex-1 truncate text-[15px] font-medium tracking-tight text-foreground">
                  {p.displayTitle}
                </p>
                <time
                  dateTime={p.date}
                  className="shrink-0 text-[13px] text-muted tabular-nums"
                >
                  {formatLongDate(p.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-24 border-t border-border pt-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto]">
          <nav aria-label="footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            <Link href="/" className="text-foreground/80 hover:text-foreground">home</Link>
            <Link href="/posts/" className="text-foreground/80 hover:text-foreground">writing</Link>
            <Link href="/resume/" className="text-foreground/80 hover:text-foreground">resume</Link>
            <Link href="/free/" className="text-foreground/80 hover:text-foreground">free</Link>
            <a
              href="mailto:christian@godsbattle.net"
              className="text-foreground/80 hover:text-foreground"
            >
              contact
            </a>
          </nav>
          <p className="text-[13px] text-muted tabular-nums sm:text-right">
            © {new Date().getUTCFullYear()} godsbattle.net
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProseLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = /^https?:/.test(href);
  const isMail = href.startsWith("mailto:");
  const isTextOnly = typeof children === "string";
  return (
    <a
      href={href}
      {...(isExternal && !isMail
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
      className={`${
        isTextOnly ? "" : "inline-flex items-baseline gap-1 "
      }font-medium text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground`}
    >
      {children}
    </a>
  );
}

function ProjectCard({
  href,
  name,
  subtitle,
  logo,
  external,
}: {
  href: string;
  name: string;
  subtitle: string;
  logo: ReactNode;
  external?: boolean;
}) {
  const props = external
    ? { target: "_blank" as const, rel: "noreferrer noopener" as const }
    : {};
  const Wrap = external ? "a" : Link;
  return (
    <Wrap
      href={href}
      {...props}
      className="card-shadow group block rounded-2xl bg-background p-1"
    >
      <div className="flex items-center gap-3 rounded-xl border border-foreground/[0.08] bg-card p-2.5">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted/15 text-foreground/85"
        >
          {logo}
        </span>
        <div className="min-w-0 flex-1 leading-snug">
          <p className="text-[14.5px] font-medium tracking-tight text-foreground">
            {name}
          </p>
          <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>
        </div>
        <ChevronRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-muted transition-[translate,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-foreground"
          strokeWidth={2}
        />
      </div>
    </Wrap>
  );
}

function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}/`}
      className="card-shadow group mt-5 grid gap-4 overflow-hidden rounded-2xl bg-card p-3 transition-shadow duration-200 ease-out sm:grid-cols-[220px_1fr] sm:items-center sm:gap-5"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted/10">
        {post.hasFeaturedImage ? (
          <Image
            src={`/posts/${post.slug}/featured.webp`}
            alt=""
            fill
            sizes="(min-width: 640px) 220px, 100vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            priority
          />
        ) : null}
      </div>
      <div className="px-1 sm:px-0">
        <p className="text-[12px] text-muted">latest</p>
        <p className="mt-1.5 text-[16px] font-medium leading-snug tracking-tight text-foreground group-hover:text-foreground/75">
          {post.displayTitle}
        </p>
        <time
          dateTime={post.date}
          className="mt-2 block text-[13px] text-muted tabular-nums"
        >
          {formatLongDate(post.date)}
        </time>
      </div>
    </Link>
  );
}

function formatLongDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase();
}
