import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FileText, ArrowUpRight, ChevronRight } from "lucide-react";
import {
  GitHubIcon,
  InstagramIcon,
  MailFilledIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/brand-icons";
import { getAllPostMeta } from "@/lib/posts";

export default async function Home() {
  const allPosts = await getAllPostMeta();
  const posts = allPosts.slice(0, 6);

  return (
    <main className="mx-auto max-w-[680px] px-6 pt-16 pb-32 sm:pt-24">
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
          <p className="text-[18px] font-medium tracking-tight text-foreground">
            Christian Obanaka{" "}
            <span className="font-normal text-muted">(a.k.a chrisgoingturbo)</span>
          </p>
          <p className="mt-1 text-[15px] font-medium text-muted">
            head of community at thePropTrade
          </p>
        </div>
      </header>

      <section
        className="mt-10 space-y-5 text-[15px] leading-[1.75] text-foreground"

      >
        <p>
          i&rsquo;m head of community at{" "}
          <ProseLink href="https://theproptrade.com">
            <Image
              src="/theproptrade-logo.svg"
              alt=""
              width={18}
              height={18}
              className="-mt-px inline-block h-[18px] w-[18px] self-center"
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
              className="-mt-px inline-block h-[18px] w-[18px] self-center"
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

      <section className="mt-20">
        <h2 className="text-[15px] font-medium tracking-tight text-foreground">
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

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15px] font-medium tracking-tight text-foreground">
            writing
          </h2>
          <Link
            href="/posts/"
            className="group inline-flex items-center gap-1 text-[13px] text-muted hover:text-foreground"
          >
            all {allPosts.length}
            <ArrowUpRight
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>
        <ul className="mt-5 space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}/`}
                className="group -mx-2 flex items-center gap-4 rounded-[14px] p-2 transition-colors duration-200 hover:bg-foreground/[0.04]"
              >
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-muted/15 ring-1 ring-border"
                >
                  <FileText
                    className="h-[16px] w-[16px] text-foreground/70"
                    strokeWidth={1.5}
                  />
                </span>
                <div className="min-w-0 flex-1 leading-snug">
                  <p className="text-[15.5px] font-medium tracking-tight text-foreground">
                    {p.displayTitle}
                  </p>
                  <time
                    dateTime={p.date}
                    className="mt-1 block text-[13px] text-muted tabular-nums"
                  >
                    {formatLongDate(p.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15px] font-medium tracking-tight text-foreground">
            resources
          </h2>
          <Link
            href="/free/"
            className="group inline-flex items-center gap-1 text-[13px] text-muted hover:text-foreground"
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
                className="h-9 w-9"
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
                className="h-7 w-7"
              />
            }
          />
        </div>
      </section>

      <footer
        className="mt-24 border-t border-border pt-8"

      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12px] text-muted tabular-nums">
            © {new Date().getUTCFullYear()} godsbattle.net
          </p>
          <ul className="flex items-center gap-1">
            <li>
              <SocialLink
                href="https://youtube.com/godsbattle"
                label="youtube"
              >
                <YouTubeIcon className="h-[14px] w-[14px]" />
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://x.com/chrisgoingturbo"
                label="x / twitter"
              >
                <XIcon className="h-[13px] w-[13px]" />
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://instagram.com/chrisgoingturbo"
                label="instagram"
              >
                <InstagramIcon className="h-[14px] w-[14px]" />
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="https://github.com/Godsbattle"
                label="github"
              >
                <GitHubIcon className="h-[14px] w-[14px]" />
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href="mailto:christian@godsbattle.net"
                label="email"
              >
                <MailFilledIcon className="h-[14px] w-[14px]" />
              </SocialLink>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-[color,background-color] duration-200 hover:bg-muted/10 hover:text-foreground"
    >
      {children}
    </a>
  );
}

function ProseLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = /^https?:/.test(href);
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isExternal && !isMail
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
      className="inline-flex items-baseline gap-1 font-semibold text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground"
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
      className="card-shadow group flex items-center gap-3 rounded-xl bg-card p-3 transition-shadow duration-200 ease-out"
    >
      <span
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-muted/15 text-foreground/85"
      >
        {icon}
      </span>
      <p className="text-[13.5px] font-medium tracking-tight text-foreground">
        {title}
      </p>
      <ArrowUpRight
        aria-hidden
        className="ml-auto h-4 w-4 text-muted transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        strokeWidth={1.75}
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
            className="h-20 w-20 object-contain"
          />
        </div>
        <div className="flex w-full flex-col px-5 pb-5 pt-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[15px] font-medium tracking-tight text-foreground">
              {name}
            </p>
            <ChevronRight
              aria-hidden
              className="h-4 w-4 -translate-x-1 text-foreground opacity-0 transition-[opacity,translate] duration-[220ms] ease-out group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={2}
            />
          </div>
          <p className="mt-1 min-h-[2lh] text-[13px] leading-snug text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </Wrap>
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
