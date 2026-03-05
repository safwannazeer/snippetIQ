import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AIGenerateModal({ isOpen, onClose, onGenerate, isGenerating }) {
  const [prompt, setPrompt] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt.trim());
    setPrompt("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl animate-fade-in transition-theme">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">Generate with AI</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="ai-prompt" className="text-sm font-medium text-card-foreground">
              Describe what you need
            </Label>
            <Input
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g. "binary search in Java"'
              className="mt-1.5 focus-visible:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSubmit())}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              AI will generate code and insert it into the editor.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!prompt.trim() || isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}
