import { useState, useEffect, useCallback } from "react";
import type { Snippet } from "@/lib/types";

const STORAGE_KEY = "snippetiq-snippets";

function loadSnippets(): Snippet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSnippets(snippets: Snippet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function useSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>(loadSnippets);

  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  const addSnippet = useCallback((snippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newSnippet: Snippet = {
      ...snippet,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setSnippets((prev) => [newSnippet, ...prev]);
    return newSnippet;
  }, []);

  const updateSnippet = useCallback((id: string, updates: Partial<Omit<Snippet, "id" | "createdAt">>) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
    );
  }, []);

  const deleteSnippet = useCallback((id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { snippets, addSnippet, updateSnippet, deleteSnippet };
}
