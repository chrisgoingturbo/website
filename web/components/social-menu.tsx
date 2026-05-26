"use client";

import { useEffect, type ReactNode } from "react";
import { DotsThree } from "@phosphor-icons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SocialMenuItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

export function SocialMenu({ items }: { items: SocialMenuItem[] }) {
  // Rapid clicks on the trigger fire selectstart on <html> (Radix's dismiss
  // overlay catches the second click), which the browser resolves by selecting
  // the nearest text — the body paragraph. Block that exact case. Normal text
  // selection fires selectstart on the paragraph itself, not on <html>/<body>.
  useEffect(() => {
    const handler = (event: Event) => {
      const target = event.target as Node | null;
      if (target === document.documentElement || target === document.body) {
        event.preventDefault();
      }
    };
    document.addEventListener("selectstart", handler, { capture: true });
    return () => document.removeEventListener("selectstart", handler, { capture: true });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="more links"
        title="more links"
        className="grid h-10 w-10 cursor-pointer select-none place-items-center rounded-full text-muted ring-1 ring-border outline-none transition-colors duration-200 hover:bg-foreground/[0.04] hover:text-foreground data-[state=open]:bg-foreground/[0.04] data-[state=open]:text-foreground"
      >
        <DotsThree className="h-5 w-5" weight="bold" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-48">
        {items.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <DropdownMenuItem key={item.href} asChild>
              <a
                href={item.href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                <span
                  aria-hidden
                  className="grid h-3.5 w-3.5 shrink-0 place-items-center text-foreground/70"
                >
                  {item.icon}
                </span>
                {item.label}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
