import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SocialCard, socialImageSize } from "../../_components/social-card";

export const alt = "trackmyprop — product design and engineering case study";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const geist = await readFile(
    join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"),
  );

  return new ImageResponse(
    <SocialCard
      index="02 / CASE STUDY"
      eyebrow="Product design + engineering"
      title="trackmyprop"
      description="A desktop workspace for the operational side of prop-firm trading."
      footer="DESKTOP PRODUCT · PRIVATE BETA"
    />,
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, weight: 400, style: "normal" }],
    },
  );
}
