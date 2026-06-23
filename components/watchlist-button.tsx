"use client";

import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useWatchlist } from "@/hooks/use-watchlist";
import { MediaItem } from "@/lib/api/idlix-types";

interface WatchlistButtonProps {
  item: MediaItem;
  className?: string;
}

export default function WatchlistButton({ item, className }: WatchlistButtonProps) {
  const { hydrated, isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!hydrated) return null;

  const inList = isInWatchlist(item.id);

  return (
    <Button
      variant={inList ? "secondary" : "default"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWatchlist(item);
      }}
      className={`rounded-full flex items-center justify-center gap-2 ${className}`}
    >
      {inList ? (
        <>
          <Check className="w-4 h-4" />
          <span>My List</span>
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" />
          <span>Add to List</span>
        </>
      )}
    </Button>
  );
}
