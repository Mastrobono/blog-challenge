import { marked } from "marked";
import fs from "fs";
import path from "path";

/**
 * Parse markdown content to HTML
 * @param markdownContent - The markdown string to parse
 * @returns HTML string
 */
export function parseMarkdownToHTML(markdownContent: string): string {
  // Configure marked options
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // GitHub Flavored Markdown
  });

  return marked.parse(markdownContent) as string;
}

/**
 * Get markdown content from file
 * Always uses post-1.md for this challenge
 * @returns Markdown content as string
 */
export async function getMarkdownContent(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "content", "posts", "post-1.md");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error("Error reading markdown file:", error);
    // Return empty string if file doesn't exist
    return "";
  }
}

/**
 * Get parsed HTML content from markdown file
 * Always uses post-1.md for this challenge
 * @returns Parsed HTML string
 */
export async function getParsedMarkdownContent(): Promise<string> {
  const markdownContent = await getMarkdownContent();
  if (!markdownContent) {
    return "";
  }
  return parseMarkdownToHTML(markdownContent);
}

