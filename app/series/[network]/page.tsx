import React from "react";
import { notFound } from "next/navigation";
import { idlixApi } from "@/lib/api/idlix-client";
import { normalizeIdlixItem } from "@/lib/api/idlix-normalizers";
import MediaGrid from "@/components/media-grid";

interface NetworkConfig {
  title: string;
  fetcher: () => Promise<any>;
}

const NETWORKS: Record<string, NetworkConfig> = {
  hbo: { title: "HBO Series", fetcher: idlixApi.getHBOSeries },
  disney: { title: "Disney+ Series", fetcher: idlixApi.getDisneySeries },
  apple: { title: "Apple TV+ Series", fetcher: idlixApi.getAppleSeries },
  marvel: { title: "Marvel Series", fetcher: idlixApi.getMarvelSeries },
};

export const dynamic = "force-dynamic";

export default async function NetworkSeriesPage({
  params,
}: {
  params: { network: string };
}) {
  const config = NETWORKS[params.network.toLowerCase()];
  if (!config) {
    notFound();
  }

  const res = await config.fetcher();
  const items = (res?.data || []).map((i: any) => normalizeIdlixItem(i, "series"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight capitalize">{config.title}</h1>
        <p className="text-white/50 text-sm mt-1">Exclusive series and originals catalogue.</p>
      </div>
      <MediaGrid items={items} />
    </div>
  );
}
