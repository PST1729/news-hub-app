const SkeletonCard = ({ featured = false }: { featured?: boolean }) => {
  if (featured) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <div className="h-52 sm:h-60 w-full bg-secondary/60 animate-pulse" />
        <div className="p-5 space-y-3">
          <div className="h-2.5 w-20 rounded-full bg-primary/20 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-full rounded-full bg-secondary/60 animate-pulse" />
            <div className="h-5 w-4/5 rounded-full bg-secondary/60 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-full rounded-full bg-secondary/40 animate-pulse" />
            <div className="h-3 w-3/4 rounded-full bg-secondary/40 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-4 w-4 rounded-full bg-secondary/60 animate-pulse flex-shrink-0" />
            <div className="h-3 w-24 rounded-full bg-secondary/40 animate-pulse" />
            <div className="h-3 w-16 rounded-full bg-secondary/30 animate-pulse ml-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="h-44 w-full bg-secondary/60 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-2.5 w-16 rounded-full bg-secondary/60 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-secondary/60 animate-pulse" />
          <div className="h-4 w-4/5 rounded-full bg-secondary/60 animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-full bg-secondary/40 animate-pulse" />
          <div className="h-3 w-3/4 rounded-full bg-secondary/40 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 w-4 rounded-full bg-secondary/60 animate-pulse flex-shrink-0" />
          <div className="h-3 w-20 rounded-full bg-secondary/40 animate-pulse" />
          <div className="h-3 w-12 rounded-full bg-secondary/30 animate-pulse ml-auto" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
