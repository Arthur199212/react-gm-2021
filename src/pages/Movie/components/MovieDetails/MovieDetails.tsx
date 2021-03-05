import React from 'react'
import { Card, CardMedia } from '@app/components'
import './MovieDetails.scss'

type MovieDetailsProps = {
  movie: {
    image: string
    overview: string
    rating: number
    releaseDate: string
    runtime: number
    tagline: string
    title: string
  }
}

export const MovieDetails = ({
  movie: { image, overview, rating, releaseDate, runtime, tagline, title }
}: MovieDetailsProps) => (
  <div className='movie-details-container container'>
    <Card>
      <CardMedia image={image} title={'Star Wars: The Last Jedi'} />
    </Card>
    <div className='movie-details'>
      <h2 className='title'>{title}</h2>
      <h5 className='tagline'>{tagline}</h5>
      <span className='release-date'>{releaseDate}</span>
      <span className='runtime'>{runtime} MIN</span>
      <div className='rating'>
        <i className='rating-icon fas fa-star'></i>
        {rating}/10
      </div>
      <p className='overview'>{overview}</p>
    </div>
  </div>
)
