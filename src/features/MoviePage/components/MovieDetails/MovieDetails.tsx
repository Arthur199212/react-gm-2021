import React from 'react'
import { Card, CardMedia, DualRingSpinner } from '@app/components'
import { MovieStatus, selectMovie, selectMovieStatus } from '@app/features/MoviePage/store'
import { useAppSelector } from '@app/hooks'

export const MovieDetails = () => {
  const movie = useAppSelector(selectMovie)
  const status = useAppSelector(selectMovieStatus)

  if (status === MovieStatus.LOADING) {
    return (
      <div className={'movie-details-container container'}>
        <DualRingSpinner />
      </div>
    )
  }

  if (status === MovieStatus.ERROR || !movie) {
    return (
      <div className={'movie-details-container container'}>
        <h5 className='error-message'>Sorry, but such a movie was not found.</h5>
      </div>
    )
  }

  return (
    <div className={'movie-details-container container'}>
      <Card>
        <CardMedia image={movie.poster_path} title={'Star Wars: The Last Jedi'} />
      </Card>
      <div className='movie-details'>
        <h2 className='title'>{movie.title}</h2>
        <h5 className='tagline'>{movie.tagline}</h5>
        <span className='release-date'>{movie.release_date}</span>
        <span className='runtime'>{movie.runtime} MIN</span>
        <div className='rating'>
          <i className='rating-icon fas fa-star'></i>
          {movie.vote_average || 0}/10
        </div>
        <p className='overview'>{movie.overview}</p>
      </div>
    </div>
  )
}
