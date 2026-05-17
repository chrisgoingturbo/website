import type { Metadata } from "next";
import { Inter, Geist_Mono, Libre_Baskerville } from "next/font/google";
import { Agentation } from "agentation";
import { ThemeProvider } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["opsz"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://godsbattle.net"),
  title: {
    default: "Christian Obanaka",
    template: "%s — Christian Obanaka",
  },
  description:
    "Community manager, futures trader, web developer. Building trackmyprop.",
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
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "development" ? <Agentation /> : null}
      </body>
    </html>
  );
}
