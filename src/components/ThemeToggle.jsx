import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-theme hover:bg-accent"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
