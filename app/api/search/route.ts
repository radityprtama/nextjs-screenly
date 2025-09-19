import { NextResponse } from 'next/server'
import { tmdb, convertTMDBMovie } from '@/lib/tmdb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const searchResponse = await tmdb.searchMovies(query)
    const movies = searchResponse.results.map(convertTMDBMovie)

    return NextResponse.json({ movies })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
