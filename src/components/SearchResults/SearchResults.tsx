/* eslint-disable camelcase */
import React from 'react'
import { MovieCard, NoSearchResults } from '@app/components'
import { MOVIES } from '@app/tests/mock-data'
import { SearchResultsTestIds } from './SearchResults.constants'
import './SearchResults.scss'

export const SearchResults = () => {
  if (!MOVIES.length) return <NoSearchResults />

  return (
    <>
      <div className='movies-count-box'>
        <span className='movies-count'>39</span> movies found
      </div>
      <section className='search-results-container' data-testid={SearchResultsTestIds.CONTAINER}>
        {MOVIES.map(({ id, genres, poster_path, release_date, title, vote_average }) => (
          <MovieCard
            key={id}
            description={genres.join(', ')}
            id={id}
            image={poster_path}
            rating={vote_average}
            release={release_date.substring(0, 4)}
            title={title}
          />
        ))}
      </section>
    </>
  )
}
