"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { MediaItem } from "@/lib/api/idlix-types";
import MovieDetailModal from "./movie-detail-modal";

interface MediaCardProps {
  item: MediaItem;
}

export default function MediaCard({ item }: MediaCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fallback poster: inline CSS dark gradient svg
  const posterSrc = item.posterUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'><rect width='200' height='300' fill='%231f2937'/><text x='100' y='150' fill='%239ca3af' font-family='sans-serif' font-size='14' text-anchor='middle'>No Image Available</text></svg>";

  return (
    <>
      <div
        onClick={() => setIsDetailOpen(true)}
        className="group relative aspect-[2/3] w-full rounded-xl overflow-hidden border border-white/5 bg-white/5 cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:border-white/10 hover:shadow-xl hover:shadow-black/50"
      >
        {/* Main Poster */}
        <Image
          src={posterSrc}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          unoptimized
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 mb-1.5 text-white">{item.title}</h3>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-2 text-[10px] text-white/70">
            {item.year && <span>{item.year}</span>}
            {item.type && <span className="uppercase border border-white/20 rounded px-1">{item.type}</span>}
            {item.rating && (
              <span className="flex items-center gap-0.5 text-yellow-500 font-medium">
                <Star className="w-2.5 h-2.5 fill-current" />
                {item.rating}
              </span>
            )}
          </div>

          {/* Action Indicators */}
          <div className="flex gap-2">
            <div className="flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center gap-1 text-[10px] font-medium text-white transition-colors">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Info</span>
            </div>
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <MovieDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          slug={item.slug}
          type={item.type}
        />
      )}
    </>
  );
}
