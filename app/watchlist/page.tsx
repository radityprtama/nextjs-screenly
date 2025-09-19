import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import MovieCard from '@/components/movie-card'

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/signin?callbackUrl=/watchlist')
  }

  const items = await prisma.watchlist.findMany({
    where: { userId: session.user.id },
    include: { movie: true },
    orderBy: { addedAt: 'desc' },
  })

  return (
    <div className="container-page py-8">
      <h1 className="section-title">My List</h1>
      {items.length === 0 ? (
        <div className="text-gray-300">Belum ada film di Watchlist. Jelajahi <Link className="text-netflix-red" href="/movies">Movies</Link>.</div>
      ) : (
        <div className="grid-movies">
          {items.map(({ movie }) => (
            <MovieCard
              key={movie.id}
              movie={{
                id: movie.id,
                title: movie.title,
                description: movie.description,
                poster: movie.poster,
                backdrop: movie.backdrop,
                genre: movie.genre,
                year: movie.year,
                rating: movie.rating,
                duration: movie.duration,
              }}
              isInWatchlist
            />
          ))}
        </div>
      )}
    </div>
  )
}
