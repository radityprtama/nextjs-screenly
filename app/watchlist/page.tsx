"use client";

import React from "react";
import { useWatchlist } from "@/hooks/use-watchlist";
import MediaGrid from "@/components/media-grid";
import Link from "next/link";

export default function WatchlistPage() {
  const { watchlist, hydrated } = useWatchlist();

  if (!hydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-white/50">
        Loading your list...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Watchlist</h1>
        <p className="text-white/50 text-sm mt-1">Titles saved for discovery and metadata viewing.</p>
      </div>

      {watchlist.length > 0 ? (
        <MediaGrid items={watchlist} />
      ) : (
        <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 space-y-4">
          <p className="text-white/40">Your watchlist is empty.</p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-full"
          >
            Browse Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
