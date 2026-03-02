import { Link } from "react-router-dom";
import { formatDistanceToNow, differenceInHours } from "date-fns";
import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { toast } from "sonner";
import type { Article } from "@/lib/api";
import { getCategoryColor } from "@/lib/api";
import { useBookmarks } from "@/lib/bookmarks-context";

function calcReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const NewsCard = ({ article }: { article: Article }) => {
  const timeAgo = formatDistanceToNow(new Date(article.date), { addSuffix: true });
  const isNew = differenceInHours(new Date(), new Date(article.date)) < 3;
  const readingTime = calcReadingTime(article.fullSummary || article.summary);
  const badgeColor = getCategoryColor(article.category);

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article);
    if (bookmarked) {
      toast("Removed from saved articles", {
        icon: "🗑️",
        duration: 2000,
      });
    } else {
      toast.success("Article saved!", {
        description: "Find it in the Saved tab anytime",
        duration: 2500,
      });
    }
  };

  return (
    <div className="relative group">
      {/* Bookmark button — above the link in z-order */}
      <button
        onClick={handleBookmark}
        className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
          bookmarked
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-primary/80"
        }`}
        title={bookmarked ? "Remove bookmark" : "Save for later"}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-3.5 w-3.5" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" />
        )}
      </button>

      <Link to={`/article/${article.id}`} className="block">
        <div className="card-shine overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
          {/* Thumbnail */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
            <div className="absolute left-3 top-3 flex items-center gap-1.5">
              <span
                className={`rounded-full ${badgeColor} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm`}
              >
                {article.category}
              </span>
              {isNew && (
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="mb-2 text-[15px] font-semibold leading-snug text-card-foreground line-clamp-2 transition-colors group-hover:text-primary">
              {article.title}
            </h3>
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {article.summary}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-2">
              <img
                src={article.publisherLogo}
                alt={article.publisher}
                className="h-4 w-4 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://img.icons8.com/color/48/news.png";
                }}
              />
              <span className="text-[11px] font-medium text-muted-foreground">
                {article.publisher}
              </span>
              <span className="text-[11px] text-border">·</span>
              <span className="text-[11px] text-muted-foreground">{timeAgo}</span>
              <div className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {readingTime} min
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
