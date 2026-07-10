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
