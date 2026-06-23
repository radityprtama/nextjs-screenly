export type MediaType = "movie" | "series" | "unknown";

export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  type: MediaType;
  posterUrl?: string;
  backdropUrl?: string;
  year?: string;
  rating?: string;
  quality?: string;
  duration?: string;
  episode?: string;
  description?: string;
  genres?: string[];
  source?: "idlix";
  raw?: any;
}

export interface IdlixResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
  };
  filters?: Record<string, any>;
  results?: T;
}
