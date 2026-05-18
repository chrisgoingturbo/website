import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://godsbattle.net/sitemap.xml",
    host: "https://godsbattle.net",
  };
}
