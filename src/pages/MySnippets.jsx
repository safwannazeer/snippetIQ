import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Code2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SnippetCard } from "@/components/SnippetCard";
import { useSnippets } from "@/hooks/useSnippets";
import { LANGUAGES } from "@/lib/types";
import { toast } from "sonner";

export default function MySnippets() {
  const { snippets, deleteSnippet } = useSnippets();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLang, setFilterLang] = useState("All");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let result = snippets;
    if (filterLang !== "All") {
      result = result.filter((s) => s.language === filterLang);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.tags.some((t) => t.includes(q))
      );
    }
    return result;
  }, [snippets, searchQuery, filterLang]);

  const handleDelete = (id) => {
    deleteSnippet(id);
    toast.success("Snippet deleted");
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Snippets</h1>
        <p className="mt-1 text-sm text-muted-foreground">{snippets.length} snippets saved</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, tags, or code..."
            className="pl-9 focus-visible:ring-primary"
          />
        </div>
        <select
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value)}
          className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-theme"
        >
          <option value="All">All Languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center transition-theme">
          <Code2 className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground font-medium">No snippets yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Go to the Dashboard to create your first snippet
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onClick={() => navigate("/")}
              onDelete={() => handleDelete(snippet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
