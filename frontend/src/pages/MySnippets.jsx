import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Code2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SnippetCard } from "@/components/SnippetCard";
import { LANGUAGES } from "@/lib/types";
import { toast } from "sonner";
import axios from "axios";

export default function MySnippets() {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLang, setFilterLang] = useState("All");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Login required to view saved snippets.");
      navigate("/login");
      return;
    }

    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/snippets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSnippets(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        toast.error("Failed to load snippets");
      }
    };

    fetchSnippets();
  }, [navigate, token]);

  const filtered = useMemo(() => {
    if (!Array.isArray(snippets)) return [];

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
          (Array.isArray(s.tags) && s.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [snippets, searchQuery, filterLang]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/snippets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnippets((prev) => prev.filter((s) => s._id !== id));
      toast.success("Snippet deleted");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      toast.error("Delete failed");
    }
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
          className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground"
        >
          <option value="All">All Languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Code2 className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground font-medium">No snippets yet</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onClick={() => navigate(`/dashboard?edit=${snippet._id}`)}
              onDelete={() => handleDelete(snippet._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}