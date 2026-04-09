import { Code2, Trash2, Copy } from "lucide-react";
import { TagChip } from "@/components/TagChip";
import { toast } from "sonner";

export function SnippetCard({ snippet, onClick, onDelete }) {
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div
      className="group rounded-lg border border-border bg-card p-4 transition-theme hover:shadow-md hover:border-primary/30 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 className="h-4 w-4 shrink-0 text-primary" />
          <h3 className="font-medium text-card-foreground truncate">{snippet.title}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {snippet.language}
          </span>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 rounded-md p-1 hover:bg-primary/10 transition-all"
            aria-label="Copy code"
          >
            <Copy className="h-3.5 w-3.5 text-primary" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 rounded-md p-1 hover:bg-destructive/10 transition-all"
            aria-label="Delete snippet"
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-muted-foreground font-mono line-clamp-2">
        {snippet.code.slice(0, 120)}
        {snippet.code.length > 120 && "..."}
      </p>

      {snippet.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {snippet.tags.slice(0, 5).map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
          {snippet.tags.length > 5 && (
            <span className="text-xs text-muted-foreground">+{snippet.tags.length - 5}</span>
          )}
        </div>
      )}
    </div>
  );
}
