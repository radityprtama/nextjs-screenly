import React from "react";
import { idlixApi } from "@/lib/api/idlix-client";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import MediaGrid from "@/components/media-grid";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TrendingMoviesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const res = await idlixApi.getTrendingMovies(currentPage);
  const rawItems = res?.data || [];
  const items = rawItems.map((i: any) => normalizeIdlixItem(i, "movie"));

  const hasNext = res?.pagination?.hasNext || rawItems.length === 36;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Trending Movies</h1>
        <p className="text-white/50 text-sm mt-1">Trending cinema titles updated hourly.</p>
      </div>
      
      <MediaGrid items={items} />

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 pt-6 border-t border-white/5">
        <Link
          href={`/movies/trending?page=${Math.max(1, currentPage - 1)}`}
          className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
            currentPage <= 1
              ? "bg-white/5 border-white/10 text-white/30 pointer-events-none"
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          }`}
        >
          Previous
        </Link>
        <span className="text-xs font-semibold text-white/50">Page {currentPage}</span>
        <Link
          href={`/movies/trending?page=${currentPage + 1}`}
          className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
            !hasNext
              ? "bg-white/5 border-white/10 text-white/30 pointer-events-none"
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
