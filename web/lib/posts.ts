import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import matter from "gray-matter";
import { applyShortcodes } from "./shortcodes";
import { renderMarkdownToReact } from "./markdown";

const POSTS_DIR = path.resolve(process.cwd(), "..", "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  displayTitle: string;
  date: string;
  excerpt: string;
  hasFeaturedImage: boolean;
  heroYouTubeId: string | null;
  heroYouTubeLabel: string | null;
};

const YOUTUBE_HERO_RE =
  /\{\{<\s*youtubeLite\s+id="([^"]+)"(?:\s+label="([^"]*)")?\s*>\}\}/;

function extractHeroYouTube(
  raw: string
): { id: string; label: string } | null {
  // Only consider the first ~40 lines so we don't pick up mid-article videos.
  const head = raw.split("\n").slice(0, 40).join("\n");
  const m = head.match(YOUTUBE_HERO_RE);
  if (!m) return null;
  return { id: m[1], label: m[2] ?? "Play" };
}

function stripFirstHeroYouTube(raw: string): string {
  // Strip the first hero youtubeLite shortcode (anywhere in the first 40 lines)
  // so it doesn't render twice when also rendered as the hero.
  const lines = raw.split("\n");
  for (let i = 0; i < Math.min(lines.length, 40); i++) {
    if (YOUTUBE_HERO_RE.test(lines[i])) {
      lines[i] = lines[i].replace(YOUTUBE_HERO_RE, "").trimEnd();
      break;
    }
  }
  return lines.join("\n");
}

function toDisplayTitle(raw: string): string {
  return raw
    .replace(/\s*[!]+/g, "")
    .replace(/\s*\|\s*.*$/, "")
    .toLowerCase()
    .trim();
}

export type Post = PostMeta & {
  content: ReactNode;
};

async function readPostDirs(): Promise<string[]> {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name);
}

async function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, slug, "index.md");
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const featuredPath = path.join(POSTS_DIR, slug, "featured.webp");
  let hasFeaturedImage = false;
  try {
    await fs.access(featuredPath);
    hasFeaturedImage = true;
  } catch {
    // featured.webp not present
  }
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    hasFeaturedImage,
    raw: content,
  };
}

function deriveExcerpt(markdown: string, max = 160): string {
  const stripped = markdown
    .replace(/\{\{<[\s\S]*?>\}\}/g, "")
    .replace(/^#+\s+.+$/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^---+$/gm, "")
    .replace(/[*_>~`]/g, "")
    .trim();
  const firstPara = stripped
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p.length > 0) ?? "";
  const flat = firstPara.replace(/\s+/g, " ").trim();
  return flat.length > max ? flat.slice(0, max - 1).trimEnd() + "…" : flat;
}

export async function getAllPostMeta(): Promise<PostMeta[]> {
  const slugs = await readPostDirs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const file = await readPostFile(slug);
      const hero = extractHeroYouTube(file.raw);
      return {
        slug: file.slug,
        title: file.title,
        displayTitle: toDisplayTitle(file.title),
        date: file.date,
        hasFeaturedImage: file.hasFeaturedImage,
        excerpt: deriveExcerpt(file.raw),
        heroYouTubeId: hero?.id ?? null,
        heroYouTubeLabel: hero?.label ?? null,
      } satisfies PostMeta;
    })
  );
  return posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    if (isNaN(da) && isNaN(db)) return 0;
    if (isNaN(da)) return 1;
    if (isNaN(db)) return -1;
    return db - da;
  });
}

export async function getAllPostSlugs(): Promise<string[]> {
  return await readPostDirs();
}

export async function getPostNav(
  slug: string
): Promise<{ newer: PostMeta | null; older: PostMeta | null }> {
  const all = await getAllPostMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { newer: null, older: null };
  return {
    newer: idx > 0 ? all[idx - 1] : null,
    older: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,127}$/;

export async function getPost(slug: string): Promise<Post | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  let file;
  try {
    file = await readPostFile(slug);
  } catch {
    return null;
  }
  const hero = extractHeroYouTube(file.raw);
  const rawForBody = hero ? stripFirstHeroYouTube(file.raw) : file.raw;
  const preprocessed = applyShortcodes(rawForBody);
  const content = await renderMarkdownToReact(preprocessed);
  return {
    slug: file.slug,
    title: file.title,
    displayTitle: toDisplayTitle(file.title),
    date: file.date,
    hasFeaturedImage: file.hasFeaturedImage,
    excerpt: deriveExcerpt(file.raw),
    heroYouTubeId: hero?.id ?? null,
    heroYouTubeLabel: hero?.label ?? null,
    content,
  };
}
