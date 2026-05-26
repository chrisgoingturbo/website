import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { getAllPostMeta, type PostMeta } from "@/lib/posts";
import {
  GitHubIcon,
  InstagramIcon,
  MailFilledIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/brand-icons";
import { SocialMenu, type SocialMenuItem } from "@/components/social-menu";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SendMessageButton } from "@/components/send-message-button";

const socialItems: SocialMenuItem[] = [
  {
    href: "https://x.com/chrisgoingturbo",
    label: "x / twitter",
    icon: <XIcon className="h-3 w-3" />,
  },
  {
    href: "https://github.com/Godsbattle",
    label: "github",
    icon: <GitHubIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "https://youtube.com/godsbattle",
    label: "youtube",
    icon: <YouTubeIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "https://instagram.com/chrisgoingturbo",
    label: "instagram",
    icon: <InstagramIcon className="h-3.5 w-3.5" />,
  },
  {
    href: "mailto:christian@godsbattle.net",
    label: "email",
    icon: <MailFilledIcon className="h-3.5 w-3.5" />,
  },
];

export default async function Home() {
  const allPosts = await getAllPostMeta();
  const posts = allPosts.slice(0, 6);

  return (
    <main id="main" className="mx-auto max-w-[680px] px-6 pt-16 pb-32 sm:pt-24">
      <header className="animate-enter flex items-center justify-between gap-4" style={{ "--enter-stagger": 0 } as React.CSSProperties}>
        <div className="flex items-center gap-4">
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
        </div>
        <SocialMenu items={socialItems} />
      </header>

      <section className="animate-enter mt-10 space-y-5 text-[15px] leading-[1.75] text-foreground" style={{ "--enter-stagger": 1 } as React.CSSProperties}>
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
            className="font-semibold text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground"
          >
            a few other companies
          </Link>{" "}
          before that. you can reach me on{" "}
          <ProseLink href="https://x.com/chrisgoingturbo">
            @chrisgoingturbo
          </ProseLink>{" "}
          or via{" "}
          <ProseLink href="mailto:christian@godsbattle.net">
            <MailFilledIcon className="-mt-px inline-block h-[14px] w-[14px] text-foreground/85" />
            email
          </ProseLink>
          .
        </p>
      </section>

      <div className="animate-enter mt-8 flex flex-wrap items-center gap-3" style={{ "--enter-stagger": 2 } as React.CSSProperties}>
        <SendMessageButton />
        <CopyEmailButton />
      </div>

      <section aria-labelledby="projects-heading" className="animate-enter mt-20" style={{ "--enter-stagger": 3 } as React.CSSProperties}>
        <h2 id="projects-heading" className="text-[15px] font-medium tracking-tight text-foreground">
          projects
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ProjectCard
            href="/trackmyprop/"
            name="trackmyprop"
            subtitle="portfolio tracker for prop firm traders."
            logoSrc="/trackmyprop-logo.svg"
          />
          <ProjectCard
            href="https://youtube.com/godsbattle"
            external
            name="godsbattle"
            subtitle="pc optimization & tech tutorials on youtube."
            logoSrc="/godsbattle-logo.svg"
          />
        </div>
      </section>

      <section aria-labelledby="writing-heading" className="animate-enter mt-20" style={{ "--enter-stagger": 4 } as React.CSSProperties}>
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
              strokeWidth={1.75}
            />
          </Link>
        </div>
        {posts[0] ? <FeaturedPost post={posts[0]} /> : null}
        <ul className="mt-3 divide-y divide-border">
          {posts.slice(1).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}/`}
                className="group -mx-2 flex items-baseline justify-between gap-4 rounded-2xl px-2 py-3.5 transition-colors duration-200 hover:bg-foreground/[0.04]"
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

      <section aria-labelledby="resources-heading" className="animate-enter mt-20" style={{ "--enter-stagger": 5 } as React.CSSProperties}>
        <div className="flex items-baseline justify-between">
          <h2 id="resources-heading" className="text-[15px] font-medium tracking-tight text-foreground">
            resources
          </h2>
          <Link
            href="/free/"
            className="group inline-flex items-center gap-1 text-[14px] text-muted hover:text-foreground"
          >
            browse all
            <ArrowUpRight
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <FreeCard
            href="/free/"
            title="chart colors"
            icon={
              <Image
                src="/tradingview-logo.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 dark:invert"
              />
            }
          />
          <FreeCard
            href="/free/"
            title="notion templates"
            icon={
              <Image
                src="/notion-logo.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 dark:invert"
              />
            }
          />
        </div>
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
      }font-semibold text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground`}
    >
      {children}
    </a>
  );
}

function FreeCard({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="card-shadow group flex items-center gap-3 rounded-2xl bg-card p-3 transition-shadow duration-200 ease-out"
    >
      <span
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted/15 text-foreground/85"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1 leading-snug">
        <p className="text-[14.5px] font-medium tracking-tight text-foreground">
          {title}
        </p>
        <p className="mt-0.5 text-[12px] text-accent">free</p>
      </div>
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 text-muted transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        weight="regular"
      />
    </Link>
  );
}

function ProjectCard({
  href,
  name,
  subtitle,
  logoSrc,
  external,
}: {
  href: string;
  name: string;
  subtitle: string;
  logoSrc: string;
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
      className="card-shadow group block overflow-hidden rounded-2xl bg-background p-1"
    >
      <div className="flex w-full flex-col rounded-xl border border-foreground/[0.08] bg-card">
        <div className="flex h-[132px] w-full items-center justify-center">
          <Image
            src={logoSrc}
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 object-contain dark:invert"
          />
        </div>
        <div className="flex w-full flex-col px-5 pb-5 pt-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[15px] font-medium tracking-tight text-foreground">
              {name}
            </p>
            <CaretRight
              aria-hidden
              className="h-4 w-4 -translate-x-1 text-foreground opacity-0 transition-[opacity,translate] duration-[220ms] ease-out group-hover:translate-x-0 group-hover:opacity-100"
              weight="bold"
            />
          </div>
          <p className="mt-1 min-h-[2lh] text-[14px] leading-snug text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </Wrap>
  );
}

function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}/`}
      className="card-shadow group mt-5 grid gap-4 overflow-hidden rounded-2xl bg-card p-3 transition-shadow duration-200 ease-out sm:grid-cols-[160px_1fr] sm:items-center sm:gap-5"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted/10 sm:aspect-[4/3]">
        {post.hasFeaturedImage ? (
          <Image
            src={`/posts/${post.slug}/featured.webp`}
            alt=""
            fill
            sizes="(min-width: 640px) 160px, 100vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            priority
          />
        ) : null}
      </div>
      <div className="px-1 sm:px-0">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
          latest
        </p>
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
