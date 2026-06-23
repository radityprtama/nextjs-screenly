import { useState, useEffect } from "react";
import { MediaItem } from "@/lib/api/idlix-types";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("screenly_watchlist");
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Watchlist corruption:", e);
    }
    setHydrated(true);
  }, []);

  const addToWatchlist = (item: MediaItem) => {
    const updated = [...watchlist, item];
    setWatchlist(updated);
    localStorage.setItem("screenly_watchlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("watchlist-sync"));
  };

  const removeFromWatchlist = (id: string) => {
    const updated = watchlist.filter((item) => item.id !== id);
    setWatchlist(updated);
    localStorage.setItem("screenly_watchlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("watchlist-sync"));
  };

  const isInWatchlist = (id: string) => {
    return watchlist.some((item) => item.id === id);
  };

  const toggleWatchlist = (item: MediaItem) => {
    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  // Keep tabs in sync
  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem("screenly_watchlist");
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    };
    window.addEventListener("watchlist-sync", handleSync);
    return () => window.removeEventListener("watchlist-sync", handleSync);
  }, []);

  return {
    watchlist,
    hydrated,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
  };
}
