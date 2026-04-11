import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Search, Save, Sparkles, ChevronLeft } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagChip } from "@/components/TagChip";
import { SaveSnippetModal } from "@/components/SaveSnippetModal";
import { AIGenerateModal } from "@/components/AIGenerateModal";
import { generateTags } from "@/lib/tagGenerator";
import { LANGUAGES, languageToMonaco } from "@/lib/types";
import { toast } from "sonner";

const sampleCode = {
  JavaScript: `// Welcome to SnippetIQ\n// Start coding or paste your snippet here\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));`,
  TypeScript: `// Welcome to SnippetIQ\n\ninterface User {\n  name: string;\n  email: string;\n}\n\nconst greet = (user: User): string => {\n  return \`Hello, \${user.name}!\`;\n};`,
  Python: `# Welcome to SnippetIQ\n\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
};

export default function Dashboard({ isDark }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const editingId = searchParams.get('edit');
  const [code, setCode] = useState(sampleCode["JavaScript"] || "");
  const [language, setLanguage] = useState("JavaScript");
  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!editingId) {
      setCode(sampleCode["JavaScript"] || "");
      setLanguage("JavaScript");
      setTitle("");
      setIsEditing(false);
      return;
    }

    if (!token) {
      toast.error("Authentication required to edit snippets.");
      return;
    }

    const fetchSnippet = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;

axios.get(`${API}/api/...`);
        const res = await axios.get(`${API}/api/snippets/${editingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const snippet = res.data.data;
        setCode(snippet.code);
        setLanguage(snippet.language);
        setTitle(snippet.title);
        setIsEditing(true);
      } catch (err) {
        console.error("Failed to load snippet for editing:", err);
        toast.error("Unable to load snippet.");
        setSearchParams({});
      }
    };

    fetchSnippet();
  }, [editingId, token, setSearchParams]);

  const tags = useMemo(() => generateTags(code, language), [code, language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (sampleCode[lang] && code === (sampleCode[language] || "")) {
      setCode(sampleCode[lang]);
    }
  };

  const handleSave = async (saveTitle, saveTags) => {
    if (!token) {
      toast.error("Login required to save snippets.");
      return;
    }

    const payload = {
      title: saveTitle,
      code,
      language,
      tags: saveTags,
      description: "",
    };

    try {
      if (isEditing && editingId) {
        const API = import.meta.env.VITE_API_URL;

        await axios.put(`${API}/api/snippets/${editingId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Snippet updated successfully!");
        setSearchParams({});
        setIsEditing(false);
      } else {
        await axios.post(`${API}/api/snippets`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Snippet saved successfully!");
      }
      setShowSaveModal(false);
    } catch (err) {
      console.error("Failed to save snippet:", err);
      toast.error("Could not save snippet. Please try again.");
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setSearchParams({});
      setIsEditing(false);
      setCode(sampleCode["JavaScript"] || "");
      setLanguage("JavaScript");
      setTitle("");
    }
  };

  const handleAIGenerate = useCallback(async (prompt) => {
    setIsGenerating(true);
    try {
      const API = import.meta.env.VITE_API_URL;

axios.get(`${API}/api/...`);
      const res = await axios.post(`${API}/api/ai/generate`, {
        mode: "generate",
        prompt,
        language,
      });

      const text = res.data?.result;
      if (!text) {
        throw new Error("AI backend returned no code.");
      }

      setCode(text);
      toast.success("Code generated!");
    } catch (err) {
      console.error("AI generation failed:", err);
      toast.error(err.response?.data?.message || err.message || "AI generation failed");
    } finally {
      setIsGenerating(false);
      setShowAIModal(false);
    }
  }, [language]);

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          {isEditing && (
            <button
              onClick={handleCancel}
              className="rounded-md p-2 hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? "Edit Snippet" : "Dashboard"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isEditing ? `Editing: ${title}` : "Write, edit, and save your code snippets"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search snippets by title, tags, or code..."
            className="pl-9 focus-visible:ring-primary"
          />
        </div>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-theme"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-border shadow-sm transition-theme">
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 transition-theme">
          <span className="text-xs font-medium text-muted-foreground">{language}</span>
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
          </div>
        </div>
        <Editor
          height="400px"
          language={languageToMonaco[language] || "plaintext"}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme={isDark ? "vs-dark" : "light"}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            minimap: { enabled: false },
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: "always",
            autoIndent: "full",
            tabSize: 2,
            wordWrap: "on",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
          }}
        />
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <Button onClick={() => setShowSaveModal(true)} className="gap-2">
          <Save className="h-4 w-4" />
          {isEditing ? "Update" : "Save"}
        </Button>
        <Button variant="outline" onClick={() => setShowAIModal(true)} className="gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Generate with AI
        </Button>
        {isEditing && (
          <Button variant="ghost" onClick={handleCancel} className="gap-2">
            Cancel
          </Button>
        )}
      </div>

      <SaveSnippetModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSave}
        autoTags={tags}
        language={language}
        initialTitle={isEditing ? title : ""}
      />

      <AIGenerateModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onGenerate={handleAIGenerate}
        onExplain={(result) => {
          if (result) {
            toast.success("AI explanation ready");
          }
        }}
        editorCode={code}
        isGenerating={isGenerating}
      />
    </div>
  );
}
