export function cn(
  ...args: Array<string | number | null | undefined | false>
): string {
  return args.filter(Boolean).join(" ");
}
