import { Send } from "lucide-react";

const TELEGRAM_URL = "https://t.me/godsbattle";

export function SendMessageButton() {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[15px] font-medium text-background"
    >
      <Send aria-hidden className="size-[14px]" strokeWidth={2} />
      <span>send message</span>
    </a>
  );
}
