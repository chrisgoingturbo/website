import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/posts";

const BASE = "https://godsbattle.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostMeta();
  const latestPost = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/work/trackmyprop/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/resume/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/posts/`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/free/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/posts/${p.slug}/`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
