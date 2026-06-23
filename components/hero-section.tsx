"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { MediaItem } from "@/lib/api/idlix-types";
import WatchlistButton from "./watchlist-button";
import MovieDetailModal from "./movie-detail-modal";

interface HeroSectionProps {
  media: MediaItem;
}

export default function HeroSection({ media }: HeroSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const posterSrc = media.posterUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' fill='%23111827'/>";

  return (
    <>
      <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black">
        {/* Background backdrop banner */}
        <div className="absolute inset-0">
          <Image
            src={posterSrc}
            alt={media.title}
            fill
            priority
            className="object-cover object-top opacity-65"
            unoptimized
          />
          {/* Ambient vignette masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f11] via-transparent to-transparent"></div>
        </div>

        {/* Details layer overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 space-y-4 md:space-y-6">
            <div className="space-y-2">
              <span className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-md">
                {media.type}
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-2xl drop-shadow-lg leading-tight">
                {media.title}
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-full px-6 py-3 bg-white text-black hover:bg-white/90 flex items-center gap-2 font-bold text-sm transition-transform hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Explore Details</span>
              </button>
              
              <WatchlistButton
                item={media}
                className="rounded-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <MovieDetailModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          slug={media.slug}
          type={media.type}
        />
      )}
    </>
  );
}
