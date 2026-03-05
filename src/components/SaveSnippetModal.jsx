import { useState } from "react";
import { X, Plus } from "lucide-react";
import { TagChip } from "@/components/TagChip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SaveSnippetModal({ isOpen, onClose, onSave, autoTags, language }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(autoTags);
  const [newTag, setNewTag] = useState("");

  if (!isOpen) return null;

  const handleAddTag = () => {
    const t = newTag.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim(), tags);
    setTitle("");
    setTags([]);
    setNewTag("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl animate-fade-in transition-theme">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-card-foreground">Save Snippet</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="snippet-title" className="text-sm font-medium text-card-foreground">Title</Label>
            <Input
              id="snippet-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Binary Search Implementation"
              className="mt-1.5 focus-visible:ring-primary"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-card-foreground">Language</Label>
            <p className="mt-1 text-sm text-muted-foreground">{language}</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-card-foreground">Tags</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <TagChip key={tag} label={tag} removable onRemove={() => handleRemoveTag(tag)} />
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 focus-visible:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button size="sm" onClick={handleAddTag} className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!title.trim()}>Save Snippet</Button>
        </div>
      </div>
    </div>
  );
}
