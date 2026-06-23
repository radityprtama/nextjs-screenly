import { IdlixResponse } from "./idlix-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_IDLIX_API_BASE_URL || "https://idlix-api.herokuapp.com/api";

export async function fetchFromIdlix<T>(path: string, options?: RequestInit): Promise<T> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  try {
    const res = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`IDLIX API Warning: ${res.status} ${res.statusText} at ${path}`);
      return { success: false, data: [] } as unknown as T;
    }

    return await res.json() as T;
  } catch (error) {
    console.error(`IDLIX API connection failed at ${path}:`, error);
    return { success: false, data: [] } as unknown as T;
  }
}

export const idlixApi = {
  getStatus: () => fetchFromIdlix<any>("/"),
  getFeatured: () => fetchFromIdlix<any>("/featured"),
  getCinemaXXI: () => fetchFromIdlix<any>("/cinemaxxi"),
  
  getTrendingMovies: (page?: number) =>
    fetchFromIdlix<any>(page ? `/movie/trending/${page}` : "/movie/trending"),
  
  getMCUMovies: async () => {
    try {
      return await fetchFromIdlix<any>("/movie/mcu");
    } catch {
      return await fetchFromIdlix<any>("/search?q=mcu");
    }
  },

  getTrendingSeries: () => fetchFromIdlix<any>("/series/trending"),
  
  getNetflixSeries: (page?: number) =>
    fetchFromIdlix<any>(page ? `/series/netflix/${page}` : "/series/netflix"),
  
  getMarvelSeries: () => fetchFromIdlix<any>("/genre/series/science-fiction"),
  getAppleSeries: () => fetchFromIdlix<any>("/network/series/apple-tv-plus"),
  getDisneySeries: () => fetchFromIdlix<any>("/network/series/disney-plus"),
  getHBOSeries: () => fetchFromIdlix<any>("/network/series/hbo"),

  getGenre: (type: "movie" | "series", genre: string, page?: number) =>
    fetchFromIdlix<any>(page ? `/genre/${type}/${genre}/${page}` : `/genre/${type}/${genre}`),

  getMovieDetail: (slug: string) => fetchFromIdlix<any>(`/movie/${slug}`),
  getSeriesDetail: (slug: string) => fetchFromIdlix<any>(`/series/${slug}`),
  search: (query: string) => fetchFromIdlix<any>(`/search?q=${encodeURIComponent(query)}`),
};
