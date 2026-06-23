import React from "react";
import { idlixApi } from "@/lib/api/idlix-client";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import MediaGrid from "@/components/media-grid";
import GenreChips from "@/components/genre-chips";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 1800;

export default async function MoviesPage() {
  const [trendingRes, mcuRes] = await Promise.all([
    idlixApi.getTrendingMovies(),
    idlixApi.getMCUMovies(),
  ]);

  const trending = (trendingRes?.data || []).slice(0, 12).map((i: any) => normalizeIdlixItem(i, "movie"));
  const mcu = (mcuRes?.data || []).slice(0, 12).map((i: any) => normalizeIdlixItem(i, "movie"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Browse Movies</h1>
        <p className="text-white/50 text-sm mt-1">Discover popular cinematic titles.</p>
        <GenreChips type="movie" />
      </div>

      {/* Trending Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-white/90">Trending Movies</h2>
          <Link href="/movies/trending" className="text-xs text-red-500 hover:underline flex items-center font-bold">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <MediaGrid items={trending} />
      </div>

      {/* MCU Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-white/90">Marvel Cinematic Universe</h2>
          <Link href="/movies/mcu" className="text-xs text-red-500 hover:underline flex items-center font-bold">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <MediaGrid items={mcu} />
      </div>
    </div>
  );
}
