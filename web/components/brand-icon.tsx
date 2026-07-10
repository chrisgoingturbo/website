import type { SVGProps } from "react";
import type { SimpleIcon } from "simple-icons";

/* Renders a simple-icons brand glyph (filled, 24-grid). */
export function BrandIcon({
  icon,
  size = 16,
  ...p
}: { icon: SimpleIcon; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...p}
    >
      <path d={icon.path} />
    </svg>
  );
}

/* Email isn't a brand; this filled envelope matches the simple-icons weight. */
export function MailFilledIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v.243l-10.5 6.5L1.5 6.993V6.75A2.25 2.25 0 0 1 3.75 4.5zM1.5 9.34V17.25a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25V9.34l-9.836 6.087a1 1 0 0 1-1.028 0L1.5 9.34z"
      />
    </svg>
  );
}
