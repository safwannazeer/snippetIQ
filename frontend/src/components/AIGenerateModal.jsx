import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AIGenerateModal({
  isOpen,
  onClose,
  onGenerate,
  onExplain,
  editorCode,
  language
}) {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("generate");
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (mode === "generate" && !prompt.trim()) return;
    if (mode === "explain" && !editorCode) return;

    setIsLoading(true);
    setExplanation("");
    setError("");

    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API}/api/ai/generate`, {
        mode,
        prompt,
        code: editorCode,
        language: language || "javascript",
      });

      const data = res.data;

      if (res.status !== 200) {
        setError(data.message || "Something went wrong.");
        return;
      }

      if (mode === "generate") {
        const generatedCode = data.result || "";
        if (!generatedCode.trim()) {
          setError("AI returned no code. Try rephrasing your prompt.");
          return;
        }
        onGenerate(generatedCode);
        setPrompt("");
        onClose();
      } else {
        setExplanation(data.result || "No explanation returned.");
        if (onExplain) onExplain(data.result);
      }

    } catch (err) {
      console.error(err);
      setError("Failed to reach the AI backend. Is your server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-card-foreground">
              {mode === "generate" ? "Generate Code" : "Explain Code"}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Mode Switch */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "generate" ? "default" : "outline"}
            onClick={() => { setMode("generate"); setExplanation(""); setError(""); }}
          >
            Generate
          </Button>
          <Button
            variant={mode === "explain" ? "default" : "outline"}
            onClick={() => { setMode("explain"); setError(""); }}
          >
            Explain
          </Button>
        </div>

        {/* Generate Input */}
        {mode === "generate" && (
          <div>
            <Label className="text-sm">Describe what you need</Label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g. "binary search in Java"'
              className="mt-2"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSubmit())}
            />
          </div>
        )}

        {/* Explain Mode */}
        {mode === "explain" && !explanation && (
          <p className="text-sm text-muted-foreground">
            AI will explain the current code in your editor.
          </p>
        )}

        {mode === "explain" && explanation && (
          <div className="mt-4 p-4 rounded-md border border-border bg-muted/50 text-sm max-h-60 overflow-y-auto whitespace-pre-wrap text-foreground">
            {explanation}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </div>

      </div>
    </div>
  );
}