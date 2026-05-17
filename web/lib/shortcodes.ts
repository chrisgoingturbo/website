const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]!);

function parseAttrs(input: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const m of input.matchAll(/(\w+)="([^"]*)"/g)) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

export function applyShortcodes(md: string): string {
  let out = md;

  out = out.replace(
    /\{\{<\s*youtubeLite\s+([^>]+?)\s*>\}\}/g,
    (_match, attrs: string) => {
      const a = parseAttrs(attrs);
      const id = escapeHtml(a.id ?? "");
      const label = escapeHtml(a.label ?? "Play");
      return `\n\n<lite-youtube videoid="${id}" playlabel="${label}"></lite-youtube>\n\n`;
    }
  );

  out = out.replace(
    /\{\{<\s*github\s+([^>]+?)\s*>\}\}/g,
    (_match, attrs: string) => {
      const a = parseAttrs(attrs);
      const repo = escapeHtml(a.repo ?? "");
      return `\n\n<a class="github-card" href="https://github.com/${repo}" target="_blank" rel="noreferrer noopener"><span>${repo}</span><small>github.com</small></a>\n\n`;
    }
  );

  out = out.replace(
    /\{\{<\s*button\s+([^>]+?)\s*>\}\}([\s\S]*?)\{\{<\s*\/button\s*>\}\}/g,
    (_match, attrs: string, content: string) => {
      const a = parseAttrs(attrs);
      const href = escapeHtml(a.href ?? "#");
      const text = escapeHtml(content.trim());
      return `\n\n<a class="btn" href="${href}" target="_blank" rel="noreferrer noopener">${text}</a>\n\n`;
    }
  );

  out = out.replace(
    /\{\{<\s*alert\s*>\}\}([\s\S]*?)\{\{<\s*\/alert\s*>\}\}/g,
    (_match, content: string) => {
      return `\n\n<div class="alert">\n\n${content.trim()}\n\n</div>\n\n`;
    }
  );

  return out;
}
