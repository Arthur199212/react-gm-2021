import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Filters, Footer, SearchResults } from '@app/components'
import { useAppDispatch } from '@app/hooks'
import { Header, MovieDetails } from './components'
import { fetchMovieThunk } from './store'
import './Movie.scss'

export const Movie = () => {
  const dispatch = useAppDispatch()
  const { movieId } = useParams<{ movieId: string }>()

  useEffect(() => {
    if (movieId) {
      window.scrollTo(0, 0)

      dispatch(fetchMovieThunk(movieId))
    }
  }, [dispatch, movieId])

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
