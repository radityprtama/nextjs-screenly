import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  runtime?: number
  genres?: { id: number; name: string }[]
  videos?: {
    results: {
      key: string
      site: string
      type: string
    }[]
  }
}

async function testTMDBFetch() {
  const apiKey = process.env.TMDB_API_KEY
  const baseUrl = process.env.TMDB_BASE_URL
  
  if (!apiKey || !baseUrl) {
    console.error('❌ TMDB API key or base URL not found in environment variables')
    return
  }

  console.log('🎬 Testing TMDB API connection...')
  
  try {
    // Test fetching popular movies (first page only)
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=1&language=en-US`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log(`✅ Successfully fetched ${data.results.length} movies from TMDB`)
    
    // Show first 5 movies
    console.log('\n📽️  First 5 movies:')
    data.results.slice(0, 5).forEach((movie: TMDBMovie, index: number) => {
      console.log(`${index + 1}. ${movie.title} (${new Date(movie.release_date).getFullYear()}) - Rating: ${movie.vote_average}`)
    })
    
    // Test saving one movie to database
    const firstMovie = data.results[0]
    console.log(`\n💾 Testing database save with: "${firstMovie.title}"`)
    
    // Check if movie already exists
    const existingMovie = await prisma.movie.findFirst({
      where: { title: firstMovie.title }
    })
    
    if (existingMovie) {
      console.log(`✅ Movie "${firstMovie.title}" already exists in database`)
    } else {
      // Fetch detailed movie data
      const detailResponse = await fetch(`${baseUrl}/movie/${firstMovie.id}?api_key=${apiKey}&append_to_response=videos&language=en-US`)
      const detailedMovie = await detailResponse.json()
      
      const trailer = detailedMovie.videos?.results?.find(
        (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
      )
      
      const movieData = {
        title: detailedMovie.title,
        description: detailedMovie.overview || 'No description available',
        poster: detailedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${detailedMovie.poster_path}` : null,
        backdrop: detailedMovie.backdrop_path ? `https://image.tmdb.org/t/p/w500${detailedMovie.backdrop_path}` : null,
        genre: detailedMovie.genres?.[0]?.name || 'Unknown',
        year: detailedMovie.release_date ? new Date(detailedMovie.release_date).getFullYear() : new Date().getFullYear(),
        rating: Math.round(detailedMovie.vote_average * 10) / 10,
        duration: detailedMovie.runtime || 120,
        trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
        featured: false
      }
      
      await prisma.movie.create({
        data: movieData
      })
      
      console.log(`✅ Successfully saved "${firstMovie.title}" to database`)
    }
    
    // Show database statistics
    const totalMovies = await prisma.movie.count()
    console.log(`\n📊 Total movies in database: ${totalMovies}`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testTMDBFetch()
