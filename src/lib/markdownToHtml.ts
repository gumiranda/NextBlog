import html from "remark-html";
import { unified } from "unified";
import remarkParse from "remark-parse";

export default async function markdownToHtml(markdown: string) {
  const result = await unified().use(remarkParse).use(html).process(markdown);
  return result.toString();
}
