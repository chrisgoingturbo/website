import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import { visit } from "unist-util-visit";
import { Fragment, type ReactNode } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function rehypeDemoteHeadings() {
  return (tree: unknown) => {
    visit(tree as Parameters<typeof visit>[0], "element", (node) => {
      const el = node as { tagName: string };
      const match = el.tagName.match(/^h([1-5])$/);
      if (match) el.tagName = `h${Number(match[1]) + 1}`;
    });
  };
}

function rehypeStripScripts() {
  return (tree: unknown) => {
    visit(
      tree as Parameters<typeof visit>[0],
      "element",
      (node, index, parent) => {
        const el = node as { tagName: string };
        if (el.tagName === "script" && parent && typeof index === "number") {
          (parent as { children: unknown[] }).children.splice(index, 1);
          return ["skip", index];
        }
      }
    );
  };
}

// Detect CTA-style links and lift them out as buttons.
//
// A paragraph or heading whose only meaningful child is a single link (optionally
// wrapped in <strong>/<em>, surrounded by decorative text like "▶", emoji, or
// trailing/leading whitespace) is almost always a download/external CTA in this
// archive. Promote that link to a button and unwrap the surrounding heading so
// it doesn't render at heading scale.
const DECORATIVE_TEXT =
  /^[\s▶◀▷◁►◄→←⇒⇐➜⤴︎↗︎📥📦🔗📹💡🚀✨🔥⭐️]*$/u;
const CTA_TAGS = new Set(["p", "li", "h1", "h2", "h3", "h4", "h5", "h6"]);
const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function findSoleLink(node: HastNode): HastNode | null {
  const kids = (node.children ?? []).filter((c) => {
    if (c.type === "text") return !DECORATIVE_TEXT.test(c.value ?? "");
    return true;
  });
  if (kids.length !== 1) return null;
  const only = kids[0];
  if (only.tagName === "a") return only;
  // unwrap one level of <strong>/<em>
  if (
    (only.tagName === "strong" || only.tagName === "em") &&
    only.children?.length
  ) {
    return findSoleLink(only);
  }
  return null;
}

function isHttpHref(href: unknown): href is string {
  if (typeof href !== "string") return false;
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("/") ||
    href.startsWith("mailto:")
  );
}

function rehypeAutoCta() {
  return (tree: unknown) => {
    visit(
      tree as Parameters<typeof visit>[0],
      "element",
      (node, index, parent) => {
        const el = node as HastNode;
        if (!el.tagName || !CTA_TAGS.has(el.tagName)) return;
        if (!parent || typeof index !== "number") return;
        const link = findSoleLink(el);
        if (!link) return;
        const href = link.properties?.href;
        if (!isHttpHref(href)) return;
        // already a shortcode-emitted button or post-card — leave alone
        const existing = String(link.properties?.className ?? "");
        if (existing.includes("btn") || existing.includes("post-card")) return;
        // For list items: only promote if it's the lone item in its list
        // (a "styled CTA" hidden in a bullet) — leave reference lists alone.
        if (el.tagName === "li") {
          const list = parent as HastNode;
          const liSiblings = (list.children ?? []).filter(
            (c) => (c as HastNode).tagName === "li"
          );
          if (liSiblings.length > 1) return;
        }

        link.properties = link.properties ?? {};
        link.properties.className = "btn";
        link.properties["data-cta"] = "true";

        // For headings, replace the heading with the link so it doesn't
        // render at heading scale. For paragraphs/li, leave the wrapper
        // so prose spacing still applies.
        if (HEADING_TAGS.has(el.tagName)) {
          (parent as { children: HastNode[] }).children[index] = link;
          return ["skip", index];
        }
      }
    );
  };
}

const reactProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStripScripts)
  .use(rehypeDemoteHeadings)
  .use(rehypeAutoCta)
  .use(rehypeReact, { Fragment, jsx, jsxs });

export async function renderMarkdownToReact(
  markdown: string
): Promise<ReactNode> {
  const file = await reactProcessor.process(markdown);
  return file.result as ReactNode;
}
