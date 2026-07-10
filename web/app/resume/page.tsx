import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "resume",
  description:
    "community manager, futures trader, web developer. building trackmyprop.",
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
    end: "present",
    blurb:
      "scaling the community, driving organic engagement, and shaping a space traders actually feel at home in.",
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

const skills = [
  "community strategy, growth, and moderation across discord, telegram, and x",
  "affiliate program management and partnership development",
  "CRM workflows on intercom and zendesk",
  "data-driven growth using engagement metrics and analytics",
  "sales pitching, copywriting, and content planning",
];

const tools = [
  ["community", ["discord", "telegram", "x", "whatsapp", "circle"]],
  ["affiliate", ["gleam", "zealy"]],
  ["support", ["intercom", "zendesk"]],
  ["operations", ["notion", "figma", "clickup", "slack"]],
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

const projects = [
  { label: "trackmyprop", href: "https://trackmyprop.app" },
  { label: "godsbattle", href: "https://youtube.com/godsbattle" },
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
          <p className="mt-2 text-[15px] leading-[1.65] text-muted">
            community manager, futures trader, web developer.
          </p>
        </header>

        <Section title="experience">
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

        <Section title="skills">
          <ul className="space-y-2 text-[14px] leading-[1.65] text-foreground/85">
            {skills.map((skill) => (
              <li key={skill} className="flex gap-3">
                <span aria-hidden className="mt-[10px] block h-px w-3 shrink-0 bg-border" />
                <span>{skill}</span>
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
                <dt className="text-[13px] uppercase tracking-[0.12em] text-muted">
                  {area}
                </dt>
                <dd className="text-[14px] leading-[1.65] text-foreground/85">
                  {list.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="projects">
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.href}>
                <ExtLink href={p.href}>{p.label}</ExtLink>
              </li>
            ))}
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

        <footer className="mt-20 border-t border-border pt-8 text-[14px] text-muted">
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
      <h2 className="mb-5 text-[13px] font-medium uppercase tracking-[0.14em] text-muted">
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
