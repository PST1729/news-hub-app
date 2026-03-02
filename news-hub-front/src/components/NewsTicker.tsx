import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import type { Article } from "@/lib/api";

interface NewsTickerProps {
  articles: Article[];
}

const NewsTicker = ({ articles }: NewsTickerProps) => {
  if (!articles.length) return null;

  // Duplicate so the loop is seamless — the animation moves exactly -50%
  const items = [...articles, ...articles];

  return (
    <div className="border-b border-border/40 bg-primary/5 overflow-hidden">
      <div className="flex items-stretch">
        {/* Label pill */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-primary px-4 py-2 z-10">
          <Zap className="h-3 w-3 text-primary-foreground" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-foreground whitespace-nowrap">
            Breaking
          </span>
        </div>

        {/* Scrolling strip */}
        <div className="relative flex-1 overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/60 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/60 to-transparent z-10 pointer-events-none" />

          <div className="animate-ticker flex whitespace-nowrap py-2">
            {items.map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                to={`/article/${article.id}`}
                className="inline-flex items-center gap-2.5 px-6 text-xs text-foreground/80 hover:text-primary transition-colors"
              >
                <span className="text-primary opacity-60">◆</span>
                <span className="font-medium">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
