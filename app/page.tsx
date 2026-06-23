import React from "react";
import { idlixApi } from "@/lib/api/idlix-client";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import HeroSection from "@/components/hero-section";
import MediaRail from "@/components/media-rail";
import { MediaItem } from "@/lib/api/idlix-types";

export const revalidate = 1800; // 30 minutes cache

export default async function HomePage() {
  // Concurrent fetch with full isolation to prevent single endpoint failure crashes
  const results = await Promise.allSettled([
    idlixApi.getFeatured(),
    idlixApi.getCinemaXXI(),
    idlixApi.getTrendingMovies(),
    idlixApi.getTrendingSeries(),
    idlixApi.getMCUMovies(),
    idlixApi.getNetflixSeries(),
  ]);

  const featuredRaw = results[0].status === "fulfilled" ? results[0].value?.data || [] : [];
  const cinemaxxiRaw = results[1].status === "fulfilled" ? results[1].value?.data || [] : [];
  const trendingMoviesRaw = results[2].status === "fulfilled" ? results[2].value?.data || [] : [];
  const trendingSeriesRaw = results[3].status === "fulfilled" ? results[3].value?.data || [] : [];
  const mcuRaw = results[4].status === "fulfilled" ? results[4].value?.data || [] : [];
  const netflixRaw = results[5].status === "fulfilled" ? results[5].value?.data || [] : [];

  // Normalize
  const featured: MediaItem[] = featuredRaw.map((i: any) => normalizeIdlixItem(i));
  const cinemaxxi: MediaItem[] = cinemaxxiRaw.map((i: any) => normalizeIdlixItem(i, "movie"));
  const trendingMovies: MediaItem[] = trendingMoviesRaw.map((i: any) => normalizeIdlixItem(i, "movie"));
  const trendingSeries: MediaItem[] = trendingSeriesRaw.map((i: any) => normalizeIdlixItem(i, "series"));
  const mcu: MediaItem[] = mcuRaw.map((i: any) => normalizeIdlixItem(i, "movie"));
  const netflix: MediaItem[] = netflixRaw.map((i: any) => normalizeIdlixItem(i, "series"));

  // Select first item of featured as primary hero highlight
  const heroMedia = featured[0] || null;

  return (
    <div className="space-y-8 -mt-24">
      {/* Immersive Hero Header */}
      {heroMedia && <HeroSection media={heroMedia} />}

      {/* Catalog Rails */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <MediaRail title="Featured & Popular Now" items={featured} />
        <MediaRail title="Cinema XXI (Recent Movies)" items={cinemaxxi} />
        <MediaRail title="Trending Movies" items={trendingMovies} />
        <MediaRail title="Trending TV Series" items={trendingSeries} />
        <MediaRail title="Marvel Cinematic Universe (MCU)" items={mcu} />
        <MediaRail title="Netflix Originals" items={netflix} />
      </div>
    </div>
  );
}
