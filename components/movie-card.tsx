'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Plus, ThumbsUp, ChevronDown, Heart, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDuration, formatYear } from '@/lib/utils'
import { motion } from 'framer-motion'
import MovieDetailModal from '@/components/movie-detail-modal'

interface Movie {
  id: string
  title: string
  description: string
  poster: string | null
  backdrop: string | null
  genre: string
  year: number
  rating: number
  duration: number
  trailer?: string
}

interface MovieCardProps {
  movie: Movie
  onAddToWatchlist?: (movieId: string) => void
  isInWatchlist?: boolean
}

export default function MovieCard({ movie, onAddToWatchlist, isInWatchlist }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Convert movie data to ensure all required fields
  const movieData = {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    poster: movie.poster || 'https://via.placeholder.com/500x750?text=No+Poster',
    backdrop: movie.backdrop || 'https://via.placeholder.com/1280x720?text=No+Image',
    genre: movie.genre,
    year: movie.year,
    rating: movie.rating,
    duration: movie.duration,
    trailer: movie.trailer,
  }

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <MovieDetailModal movie={movieData}>
        <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-800">
          <Image
            src={movieData.poster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Content */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col justify-end p-4 text-white"
            >
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
              <p className="text-sm text-gray-300 mb-3 line-clamp-3">{movie.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                    ★ {movie.rating}
                  </span>
                  <span>{formatYear(movie.year)}</span>
                  <span>{formatDuration(movie.duration)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link href={`/watch/${movie.id}`} onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                    <Play className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                </Link>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddToWatchlist?.(movie.id)
                  }}
                >
                  {isInWatchlist ? (
                    <Heart className="h-4 w-4 fill-current text-red-500" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </MovieDetailModal>
      
      {/* Title (always visible) */}
      <div className="mt-2">
        <h3 className="text-white text-sm font-medium line-clamp-2">{movie.title}</h3>
        <p className="text-gray-400 text-xs">{movie.genre}</p>
      </div>
    </motion.div>
  )
}
