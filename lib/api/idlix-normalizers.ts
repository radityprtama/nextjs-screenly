import { MediaItem, MediaType } from "./idlix-types";

export function normalizeIdlixItem(raw: any, fallbackType: MediaType = "unknown"): MediaItem {
  if (!raw) {
    return { id: "empty", title: "Unknown Title", slug: "", type: fallbackType };
  }

  const slug = raw.slug || raw.link?.endpoint?.split("/").pop() || "";
  const title = raw.title || raw.originalTitle || "Untitled Content";
  
  let type: MediaType = fallbackType;
  if (raw.type === "movie" || raw.type === "series") {
    type = raw.type;
  } else if (raw.contentType === "series" || raw.numberOfSeasons) {
    type = "series";
  }

  let posterUrl = raw.poster || raw.link?.thumbnail || undefined;
  if (posterUrl && !posterUrl.startsWith("http")) {
    posterUrl = undefined;
  }

  return {
    id: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title,
    slug,
    type,
    posterUrl,
    year: raw.year ? String(raw.year) : undefined,
    rating: raw.rating ? String(raw.rating) : undefined,
    quality: raw.quality || undefined,
    raw,
  };
}

export function normalizeIdlixDetail(raw: any, slug: string): MediaItem {
  const base = normalizeIdlixItem(raw);
  return {
    ...base,
    slug: slug,
    id: slug,
    backdropUrl: raw.backdrop || undefined,
    description: raw.overview || undefined,
    genres: raw.genres || [],
    duration: raw.runtimeMinutes ? `${raw.runtimeMinutes} min` : undefined,
  };
}
