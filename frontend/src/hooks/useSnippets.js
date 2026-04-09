import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "snippetiq-snippets";

function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function useSnippets() {
  const [snippets, setSnippets] = useState(loadSnippets);

  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  const addSnippet = useCallback((snippet) => {
    const now = new Date().toISOString();
    const newSnippet = {
      ...snippet,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setSnippets((prev) => [newSnippet, ...prev]);
    return newSnippet;
  }, []);

  const updateSnippet = useCallback((id, updates) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s))
    );
  }, []);

  const deleteSnippet = useCallback((id) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { snippets, addSnippet, updateSnippet, deleteSnippet };
}
