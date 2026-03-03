export interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "SQL",
  "Go",
  "Rust",
  "HTML",
  "CSS",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
] as const;

export type Language = (typeof LANGUAGES)[number];

export const languageToMonaco: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  C: "c",
  "C++": "cpp",
  SQL: "sql",
  Go: "go",
  Rust: "rust",
  HTML: "html",
  CSS: "css",
  PHP: "php",
  Ruby: "ruby",
  Swift: "swift",
  Kotlin: "kotlin",
};
