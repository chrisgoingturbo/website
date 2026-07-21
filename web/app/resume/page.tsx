import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const RESUME_DESCRIPTION =
  "Design engineer, futures trader, and former prop-firm community lead focused on trading and fintech products.";

export const metadata: Metadata = {
  title: "resume",
  description: RESUME_DESCRIPTION,
  alternates: { canonical: "/resume/" },
  openGraph: {
    type: "profile",
    url: "https://godsbattle.net/resume/",
    title: "Christian Obanaka — design engineer résumé",
    description: RESUME_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Christian Obanaka — design engineer résumé",
    description: RESUME_DESCRIPTION,
  },
};

type Role = {
  company: string;
  logo: string;
  url?: string;
  title: string;
  start: string;
  end: string;
  blurb: string;
};

const experience: Role[] = [
  {
    company: "thePropTrade",
    logo: "/theproptrade-logo.svg",
    url: "https://theproptrade.com",
    title: "head of community",
    start: "Nov 2025",
    end: "Jul 2026",
    blurb:
      "scaled the community, drove organic engagement, and shaped a space traders actually feel at home in.",
  },
  {
    company: "PipFarm",
    logo: "/pipfarm-logo.svg",
    url: "https://pipfarm.com",
    title: "community + affiliate manager",
    start: "Feb 2025",
    end: "Nov 2025",
    blurb:
      "scaled the discord community from 5k → 10k in five months, drove +40% activity and +25% referrals through targeted engagement, competitions, and affiliate partnerships.",
  },
  {
    company: "PokerDAO",
    logo: "/pokerdao-logo.svg",
    url: "https://link3.to/pokerdao",
    title: "community manager",
    start: "Apr 2022",
    end: "Dec 2024",
    blurb:
      "built and moderated discord and telegram communities, grew membership from 3k → 7.5k through interactive events and web3 content, cut support response times by 50%.",
  },
];

const capabilities = [
  "product and interface design for desktop and responsive web experiences",
  "frontend implementation with react, typescript, next.js, and tailwind css",
  "interaction design, product prototyping, and iterative interface refinement",
  "design systems, reusable components, and consistent data-dense UI patterns",
  "accessible names, keyboard navigation, focus behavior, and reduced-motion support",
  "trading, prop-firm, trader-support, community, and operations domain knowledge",
  "AI-assisted research, implementation, testing, and review with human ownership of decisions",
];

const tools = [
  ["design", ["figma", "design systems", "prototyping"]],
  ["frontend", ["react", "typescript", "next.js", "tailwind css"]],
  ["product", ["electron", "git", "accessibility testing"]],
  ["operations", ["notion", "clickup", "intercom", "zendesk", "slack"]],
] as const;

const achievements = [
  {
    label: "9,000 youtube subscribers",
    href: "https://vidiq.com/certificates/Fgz03Zk3GS/",
  },
  {
    label: "4.5 million views on youtube",
    href: "https://vidiq.com/certificates/w1bqoYgFge/",
  },
];

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[680px] px-6 pt-16 pb-32 sm:pt-20">
        <header>
          <h1 className="text-[28px] font-medium tracking-tight text-foreground sm:text-[32px]">
            christian obanaka
          </h1>
          <p className="mt-3 max-w-[620px] text-pretty text-[15px] leading-[1.7] text-muted">
            Design engineer, futures trader, and former prop-firm community
            lead. I combine product design, frontend implementation, and
            firsthand trader knowledge to build focused financial-product
            experiences.
          </p>
        </header>

        <Section title="experience">
          <p className="mb-6 text-pretty text-[14px] leading-[1.7] text-foreground/80">
            Before moving into design engineering, I worked directly with
            traders through community, support, affiliate, and growth roles at
            prop firms. That experience now informs the products I design.
          </p>
          <ol className="space-y-2">
            {experience.map((role) => (
              <li
                key={role.company}
                className="group -mx-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-foreground/[0.03]"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-card ring-1 ring-border"
                  >
                    <Image
                      src={role.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain dark:invert"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <p className="text-[15px] font-medium text-foreground">
                        {role.url ? (
                          <ExtLink href={role.url}>{role.company}</ExtLink>
                        ) : (
                          role.company
                        )}
                      </p>
                      <p className="shrink-0 text-[13px] text-muted tabular-nums">
                        {role.start} &rarr; {role.end}
                      </p>
                    </div>
                    <p className="text-[14px] text-muted">{role.title}</p>
                    <p className="mt-2 text-[14px] leading-[1.65] text-foreground/80">
                      {role.blurb}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="design engineering capabilities">
          <ul className="space-y-2 text-[14px] leading-[1.65] text-foreground/85">
            {capabilities.map((capability) => (
              <li key={capability} className="flex gap-3">
                <span aria-hidden className="mt-[10px] block h-px w-3 shrink-0 bg-border" />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="tools">
          <dl className="space-y-3">
            {tools.map(([area, list]) => (
              <div
                key={area}
                className="grid grid-cols-[110px_1fr] items-baseline gap-x-4"
              >
                <dt className="text-[13px] text-muted">{area}</dt>
                <dd className="text-[14px] leading-[1.65] text-foreground/85">
                  {list.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="projects">
          <ul className="space-y-2">
            <li>
              <Link
                href="/work/trackmyprop/"
                className="text-foreground underline decoration-border underline-offset-[3px] hover:decoration-foreground"
              >
                trackmyprop — product design and engineering case study
              </Link>
            </li>
            <li>
              <ExtLink href="https://trackmyprop.app">trackmyprop product website</ExtLink>
            </li>
            <li>
              <ExtLink href="https://youtube.com/godsbattle">godsbattle</ExtLink>
            </li>
          </ul>
        </Section>

        <Section title="achievements">
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a.href}>
                <ExtLink href={a.href}>{a.label}</ExtLink>
              </li>
            ))}
          </ul>
        </Section>

        <footer className="mt-24 text-[14px] text-muted">
          <p>
            reach out:{" "}
            <ExtLink href="mailto:christian@godsbattle.net">
              christian@godsbattle.net
            </ExtLink>
          </p>
        </footer>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="mb-5 text-[15px] font-medium tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(isMail ? {} : { target: "_blank", rel: "noreferrer noopener" })}
      className="group inline-flex items-baseline gap-1 text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground"
    >
      {children}
      {!isMail ? (
        <ArrowUpRight
          aria-hidden
          className="h-3 w-3 self-center text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          strokeWidth={2}
        />
      ) : null}
    </a>
  );
}
