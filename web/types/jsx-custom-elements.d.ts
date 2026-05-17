import type { DetailedHTMLProps, HTMLAttributes } from "react";

type LiteYouTubeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  videoid?: string;
  playlabel?: string;
  params?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": LiteYouTubeProps;
    }
  }
}
