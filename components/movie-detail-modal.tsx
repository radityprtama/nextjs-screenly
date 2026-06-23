"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Star } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MediaItem } from "@/lib/api/idlix-types";
import { normalizeIdlixDetail } from "@/lib/api/idlix-normalizers";
import WatchlistButton from "./watchlist-button";

interface MovieDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  type: "movie" | "series" | "unknown";
}

export default function MovieDetailModal({
  isOpen,
  onClose,
  slug,
  type,
}: MovieDetailModalProps) {
  const [detail, setDetail] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    
    const apiEndpoint = `/api/idlix/${type === "series" ? "series" : "movie"}/${slug}`;

    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          setDetail(normalizeIdlixDetail(res.data, slug));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, slug, type]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden bg-[#0c0d0f] border border-white/10 rounded-2xl p-0 text-white shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-white/50 flex flex-col items-center justify-center gap-4">
            <span className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin"></span>
            <p>Loading metadata...</p>
          </div>
        ) : detail ? (
          <div className="relative">
            {/* Cover Banner */}
            <div className="relative h-[250px] md:h-[350px]">
              <Image
                src={detail.backdropUrl || detail.posterUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' fill='%23111827'/>"}
                alt={detail.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-[#0c0d0f]/20 to-transparent"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/90 hover:scale-105"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Detail Content */}
            <div className="p-6 md:p-8 space-y-6 relative -mt-24 z-10">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{detail.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/60">
                  {detail.year && <span>{detail.year}</span>}
                  {detail.duration && <span>{detail.duration}</span>}
                  {detail.rating && (
                    <span className="flex items-center gap-0.5 text-yellow-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {detail.rating}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Left Column: Summary */}
                <div className="md:col-span-2 space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-white/80">
                    {detail.description || "No overview available for this title."}
                  </p>

                  {/* Safety notice/Disclaimer */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300">
                    <p>
                      <strong>Playback Disabled</strong>: Screenly is a catalog and discovery interface. Direct streaming of copy-protected content is disabled. 
                    </p>
                  </div>
                </div>

                {/* Right Column: Meta info */}
                <div className="space-y-4 text-xs md:text-sm text-white/70 border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  <div>
                    <span className="text-white/40 block">Genres</span>
                    <span className="text-white/90 font-medium">{detail.genres?.join(", ") || "N/A"}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <WatchlistButton item={detail} className="flex-1 py-4 text-xs font-semibold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-white/50">
            <p>Unable to retrieve content details.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
