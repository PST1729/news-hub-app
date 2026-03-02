import { createContext, useContext, useState, useEffect } from "react";
import type { Article } from "./api";

interface BookmarksContextType {
  bookmarks: Article[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (article: Article) => void;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
});

const STORAGE_KEY = "newshub_bookmarks";

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Article[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id: string) => bookmarks.some((a) => a.id === id);

  const toggleBookmark = (article: Article) => {
    setBookmarks((prev) =>
      isBookmarked(article.id)
        ? prev.filter((a) => a.id !== article.id)
        : [article, ...prev]
    );
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarksContext);
