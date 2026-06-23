import Link from "next/link";

export const GENRES = [
  { name: "Action", slug: "action" },
  { name: "Adventure", slug: "adventure" },
  { name: "Comedy", slug: "comedy" },
  { name: "Drama", slug: "drama" },
  { name: "Korean Drama", slug: "drama-korea" },
  { name: "Fantasy", slug: "fantasy" },
  { name: "Horror", slug: "horror" },
  { name: "Sci-Fi", slug: "science-fiction" },
  { name: "Thriller", slug: "thriller" },
];

export default function GenreChips({ type }: { type: "movie" | "series" }) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {GENRES.map((genre) => (
        <Link
          key={genre.slug}
          href={`/genre/${type}/${genre.slug}`}
          className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}
