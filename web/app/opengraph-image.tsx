import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SocialCard, socialImageSize } from "./_components/social-card";

export const alt = "Christian Obanaka — Design engineer";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const geist = await readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
  );

  return new ImageResponse(
    <SocialCard
      index="01 / PORTFOLIO"
      eyebrow="Portfolio"
      title="Design engineer."
      description="I design and build clear, polished products for traders."
      footer="PRODUCT DESIGN · FRONTEND ENGINEERING"
    />,
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, weight: 400, style: "normal" }],
    },
  );
}
