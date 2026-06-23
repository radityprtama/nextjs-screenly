import React from "react";
import { idlixApi } from "@/lib/api/idlix-client";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import MediaGrid from "@/components/media-grid";
import GenreChips from "@/components/genre-chips";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 1800;

export default async function SeriesPage() {
  const [trendingRes, netflixRes] = await Promise.all([
    idlixApi.getTrendingSeries(),
    idlixApi.getNetflixSeries(),
  ]);

  const trending = (trendingRes?.data || []).slice(0, 12).map((i: any) => normalizeIdlixItem(i, "series"));
  const netflix = (netflixRes?.data || []).slice(0, 12).map((i: any) => normalizeIdlixItem(i, "series"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Browse TV Series</h1>
        <p className="text-white/50 text-sm mt-1">Discover popular television series and collections.</p>
        <GenreChips type="series" />
      </div>

      {/* Trending Rail */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-white/90">Trending TV Series</h2>
        </div>
        <MediaGrid items={trending} />
      </div>

      {/* Netflix Originals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-white/90">Netflix Series</h2>
          <Link href="/series/netflix" className="text-xs text-red-500 hover:underline flex items-center font-bold">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <MediaGrid items={netflix} />
      </div>
    </div>
  );
}
