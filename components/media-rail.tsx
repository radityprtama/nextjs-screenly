"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MediaItem } from "@/lib/api/idlix-types";
import MediaCard from "./media-card";

interface MediaRailProps {
  title: string;
  items: MediaItem[];
}

export default function MediaRail({ title, items }: MediaRailProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative py-6 group">
      <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-white/90">
        {title}
      </h2>
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-[160px] md:w-[190px] shrink-0">
              <MediaCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
