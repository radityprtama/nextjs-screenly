import React from "react";

export function CardSkeleton() {
  return (
    <div className="aspect-[2/3] w-full rounded-xl bg-white/5 border border-white/10 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function RailSkeleton({ title }: { title?: string }) {
  return (
    <div className="py-6 space-y-4">
      {title && <div className="h-6 bg-white/10 rounded w-48 animate-pulse"></div>}
      <div className="flex space-x-4 overflow-x-hidden">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="w-[180px] shrink-0">
            <CardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
}
