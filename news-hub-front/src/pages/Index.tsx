import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopHeadlines, getCategoryColor } from "@/lib/api";
import type { Article } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import SkeletonCard from "@/components/SkeletonCard";
import NewsTicker from "@/components/NewsTicker";
import { useBookmarks } from "@/lib/bookmarks-context";
import { useTheme } from "@/lib/use-theme";
import { useReadingHistory } from "@/lib/use-reading-history";
import { toast } from "sonner";
import {
  Zap,
  Loader2,
  Search,
  X,
  Globe,
  Cpu,
  Briefcase,
  Heart,
  FlaskConical,
  Trophy,
  Film,
  TrendingUp,
  Star,
  Newspaper,
  Bookmark,
  Clock,
  Sun,
  Moon,
  History,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow, differenceInHours } from "date-fns";

const CATEGORIES = [
  { id: "general", label: "All News", icon: Globe },
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "health", label: "Health", icon: Heart },
  { id: "science", label: "Science", icon: FlaskConical },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "entertainment", label: "Entertainment", icon: Film },
  { id: "saved", label: "Saved", icon: Bookmark },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("technology");
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const isSaved = activeCategory === "saved";
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const { isDark, toggleTheme } = useTheme();
  const { history: readingHistory, clearHistory } = useReadingHistory();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    toast.success("You're subscribed!", {
      description: `We'll send the best stories to ${email}`,
      duration: 3500,
    });
  };

  const handleBookmarkFeatured = (article: Article) => {
    const wasBookmarked = isBookmarked(article.id);
    toggleBookmark(article);
    if (wasBookmarked) {
      toast("Removed from saved articles", { icon: "🗑️", duration: 2000 });
    } else {
      toast.success("Article saved!", {
        description: "Find it in the Saved tab anytime",
        duration: 2500,
      });
    }
  };

  const { data: fetchedArticles, isLoading, isError } = useQuery({
    queryKey: ["top-headlines", activeCategory],
    queryFn: () => fetchTopHeadlines(activeCategory),
    staleTime: 5 * 60 * 1000,
    enabled: !isSaved,
  });

  const articles = isSaved ? bookmarks : fetchedArticles;

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    if (!searchQuery.trim()) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.publisher.toLowerCase().includes(q)
    );
  }, [articles, searchQuery]);

  const featured = filteredArticles.slice(0, 2);
  const latest = filteredArticles.slice(2);

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "News";

  // Ctrl+K / Cmd+K focuses the search bar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                News<span className="text-gradient">Hub</span>
              </h1>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-auto relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search headlines… (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border/60 bg-secondary/40 pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Live indicator */}
            <div className="hidden sm:flex flex-shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Live
            </div>

            {/* Dark / Light toggle */}
            <button
              onClick={toggleTheme}
              className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-secondary/50 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-t border-border/40">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex gap-1 overflow-x-auto scrollbar-none py-2.5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const isSavedTab = cat.id === "saved";
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery("");
                    }}
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                    {isSavedTab && bookmarks.length > 0 && (
                      <span
                        className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                          isActive
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {bookmarks.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Breaking news ticker — shown when articles are loaded */}
        {!isSaved && fetchedArticles && fetchedArticles.length > 0 && (
          <NewsTicker articles={fetchedArticles} />
        )}
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* Skeleton loading */}
        {isLoading && !isSaved && (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3.5 w-3.5 rounded-full bg-secondary/60 animate-pulse" />
              <div className="h-3 w-32 rounded-full bg-secondary/60 animate-pulse" />
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="mb-10 grid gap-5 md:grid-cols-2">
              <SkeletonCard featured />
              <SkeletonCard featured />
            </div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3.5 w-3.5 rounded-full bg-secondary/60 animate-pulse" />
              <div className="h-3 w-24 rounded-full bg-secondary/60 animate-pulse" />
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <Newspaper className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-destructive text-center max-w-xs">
              Could not load news. Please try again later.
            </p>
          </div>
        )}

        {/* Empty bookmarks */}
        {isSaved && bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <Bookmark className="h-10 w-10 text-muted-foreground/30" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                No saved articles yet
              </p>
              <p className="text-xs text-muted-foreground">
                Hover any article card and click the bookmark icon to save it here
              </p>
            </div>
          </div>
        )}

        {/* No search results */}
        {!isLoading && !isError && searchQuery && filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <Search className="h-10 w-10 text-muted-foreground/30" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                No results for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Try different keywords or browse another category
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {!isLoading && filteredArticles.length > 0 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Continue Reading ── */}
              {!isSaved && !searchQuery && readingHistory.length > 0 && (
                <section className="mb-10">
                  <div className="mb-4 flex items-center gap-3">
                    <History className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Continue Reading
                    </h2>
                    <div className="h-px flex-1 bg-border/60" />
                    <button
                      onClick={clearHistory}
                      className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {readingHistory.slice(0, 3).map((article, i) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <NewsCard article={article} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* ── Featured Stories ── */}
              {featured.length > 0 && (
                <section className="mb-12">
                  <div className="mb-6 flex items-center gap-3">
                    <Star className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      Featured Stories
                    </h2>
                    <div className="h-px flex-1 bg-border/60" />
                    <span className="text-[11px] text-muted-foreground">
                      {featured.length} highlight{featured.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div
                    className={`grid gap-5 ${
                      featured.length > 1 ? "md:grid-cols-2" : ""
                    }`}
                  >
                    {featured.map((article, i) => {
                      const isNew =
                        differenceInHours(new Date(), new Date(article.date)) < 3;
                      const bookmarked = isBookmarked(article.id);
                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="relative group"
                        >
                          {/* Featured bookmark button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleBookmarkFeatured(article);
                            }}
                            className={`absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
                              bookmarked
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : "bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-primary/80"
                            }`}
                            title={bookmarked ? "Remove bookmark" : "Save for later"}
                          >
                            {bookmarked ? (
                              <Bookmark className="h-4 w-4 fill-current" />
                            ) : (
                              <Bookmark className="h-4 w-4" />
                            )}
                          </button>

                          <Link
                            to={`/article/${article.id}`}
                            className="block h-full"
                          >
                            <div className="h-full overflow-hidden rounded-2xl border border-border/60 bg-card glow-primary transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                              <div className="relative h-52 sm:h-60 overflow-hidden">
                                <img
                                  src={article.thumbnail}
                                  alt={article.title}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                                <div className="absolute left-4 top-4 flex items-center gap-2">
                                  <span
                                    className={`rounded-full ${getCategoryColor(article.category)} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg`}
                                  >
                                    {article.category}
                                  </span>
                                  <span className="rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white/90 uppercase tracking-wider">
                                    Featured
                                  </span>
                                  {isNew && (
                                    <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                      New
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="p-5">
                                <h2 className="mb-2.5 text-[17px] font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                                  {article.title}
                                </h2>
                                <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                  {article.summary}
                                </p>
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={article.publisherLogo}
                                    alt={article.publisher}
                                    className="h-4 w-4 rounded-full"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "https://img.icons8.com/color/48/news.png";
                                    }}
                                  />
                                  <span className="text-xs font-medium text-foreground">
                                    {article.publisher}
                                  </span>
                                  <span className="text-xs text-border">·</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(article.date), {
                                      addSuffix: true,
                                    })}
                                  </span>
                                  <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {Math.max(
                                      1,
                                      Math.ceil(
                                        (article.fullSummary || article.summary)
                                          .split(/\s+/)
                                          .filter(Boolean).length / 200
                                      )
                                    )}{" "}
                                    min
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ── Latest News ── */}
              {latest.length > 0 && (
                <section>
                  <div className="mb-6 flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      {isSaved ? "All Saved" : "Latest News"}
                    </h2>
                    <div className="h-px flex-1 bg-border/60" />
                    <span className="text-[11px] text-muted-foreground">
                      {latest.length} stories
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.map((article, i) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                      >
                        <NewsCard article={article} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {latest.length === 0 && featured.length > 0 && !searchQuery && !isSaved && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  More stories coming soon
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Newsletter CTA */}
      {!isSaved && (
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card px-8 py-10 text-center">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-foreground">
                Stay in the loop
              </h2>
              <p className="mb-7 text-sm text-muted-foreground max-w-sm mx-auto">
                Get the week&apos;s best stories delivered straight to your inbox. No spam, unsubscribe anytime.
              </p>
              {subscribed ? (
                <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 text-sm font-semibold text-emerald-400">
                  ✓ You&apos;re subscribed — check your inbox!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="mx-auto flex max-w-sm gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-xl border border-border/60 bg-secondary/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all shadow-md shadow-primary/20 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/60 py-10 mt-4">
        <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Zap className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              News<span className="text-gradient">Hub</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 NewsHub · Curated news across every industry
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 inline-block" />
            Powered by NewsAPI
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
