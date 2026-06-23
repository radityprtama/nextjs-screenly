"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import MediaGrid from "@/components/media-grid";
import { MediaItem } from "@/lib/api/idlix-types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`/api/idlix/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          const rawList = res.results || res.data || [];
          setResults(rawList.map((i: any) => normalizeIdlixItem(i)));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Search Catalogue</h1>
        <p className="text-white/50 text-sm mt-1">Search through all movies and TV shows.</p>
      </div>

      {/* Input Bar */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Type titles, years, actors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-red-500 focus:bg-white/10 transition-all placeholder:text-white/30"
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center gap-2 text-white/50 py-12">
          <Loader2 className="w-5 h-5 animate-spin text-red-500" />
          <span>Searching catalog...</span>
        </div>
      ) : results.length > 0 ? (
        <MediaGrid items={results} />
      ) : debouncedQuery.trim() ? (
        <div className="py-12 text-center text-white/40">
          <p>No results found for "{debouncedQuery}"</p>
        </div>
      ) : (
        <div className="py-12 text-center text-white/40">
          <p>Start typing to search movies and series.</p>
        </div>
      )}
    </div>
  );
}
