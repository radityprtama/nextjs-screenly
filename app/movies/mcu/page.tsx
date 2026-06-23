import React from "react";
import { idlixApi } from "@/lib/api/idlix-client";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import MediaGrid from "@/components/media-grid";

export const revalidate = 3600;

export default async function MCUPage() {
  const res = await idlixApi.getMCUMovies();
  const items = (res?.data || []).map((i: any) => normalizeIdlixItem(i, "movie"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Marvel Cinematic Universe (MCU)</h1>
        <p className="text-white/50 text-sm mt-1">All Marvel Cinematic Universe movies and catalog titles.</p>
      </div>
      <MediaGrid items={items} />
    </div>
  );
}
