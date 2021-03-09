import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Filters, Footer, SearchResults } from '@app/components'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { Header, MovieDetails } from './components'
import { fetchMovieThunk, selectMovie } from './store'

export const MoviePage = () => {
  const dispatch = useAppDispatch()
  const {
    query: { movieId }
  } = useRouter()
  const movie = useAppSelector(selectMovie)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (movieId && movieId !== String(movie?.id)) {
      dispatch(fetchMovieThunk(movieId as string))
    }
  }, [dispatch, movie, movieId])

  return (
    <>
      <div className='app-movie-page content'>
        <Header />
        <main className='main'>
          <MovieDetails />
          <div className='container'>
            <Filters />
            <SearchResults />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
