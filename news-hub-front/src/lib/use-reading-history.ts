import { useState } from "react";
import type { Article } from "./api";

const STORAGE_KEY = "newshub_history";
const MAX_ITEMS = 6;

function readStored(): Article[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? (JSON.parse(s) as Article[]) : [];
  } catch {
    return [];
  }
}

export function useReadingHistory() {
  const [history, setHistory] = useState<Article[]>(readStored);

  const addToHistory = (article: Article) => {
    const next = [
      article,
      ...readStored().filter((a) => a.id !== article.id),
    ].slice(0, MAX_ITEMS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setHistory(next);
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
}
