import { X } from "lucide-react";

export function TagChip({ label, onRemove, removable = false }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-tag px-2.5 py-0.5 text-xs font-medium text-tag-foreground transition-theme animate-fade-in">
      {label}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
