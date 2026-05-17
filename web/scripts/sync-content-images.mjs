import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, "..");
const src = path.resolve(webRoot, "..", "content", "posts");
const dst = path.resolve(webRoot, "public", "posts");

async function copyIfStale(from, to) {
  const fromStat = await fs.stat(from);
  const toStat = await fs.stat(to).catch(() => null);
  if (toStat && toStat.mtimeMs >= fromStat.mtimeMs) return false;
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
  return true;
}

const entries = await fs.readdir(src, { withFileTypes: true });
let updated = 0;
for (const entry of entries) {
  if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
  const from = path.join(src, entry.name, "featured.webp");
  const to = path.join(dst, entry.name, "featured.webp");
  const exists = await fs.access(from).then(() => true).catch(() => false);
  if (!exists) continue;
  if (await copyIfStale(from, to)) updated++;
}
console.log(`sync-content-images: ${updated} updated`);
