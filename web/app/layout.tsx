import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono, Libre_Baskerville } from "next/font/google";
import { Agentation } from "agentation";
import { ThemeProvider } from "./providers";
import "./globals.css";

// Official Inter 4.1 variable fonts, self-hosted from the rsms/inter release.
const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const SITE_URL = "https://godsbattle.net";
const SITE_TITLE = "Christian Obanaka";
const SITE_DESCRIPTION =
  "community manager, futures trader, web developer. building trackmyprop.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · christian obanaka",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/avatar.webp",
        width: 256,
        height: 256,
        alt: "christian obanaka",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@chrisgoingturbo",
    images: ["/avatar.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-[14px] focus:font-medium focus:text-background"
        >
          skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "development" ? <Agentation /> : null}
      </body>
    </html>
  );
}
