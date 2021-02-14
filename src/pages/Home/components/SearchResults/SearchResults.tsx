/* eslint-disable camelcase */
import React from 'react'
import { Card } from '@app/components'
import { NoSearchResults } from '@app/pages/Home/components'
import { MOVIES } from '@app/tests/mock-data'
import './SearchResults.scss'

const SearchResults = () => {
  if (!MOVIES.length) return <NoSearchResults />

  return (
    <>
      <div className='movies-found-box'>
        <span className='movies-number'>39</span> movies found
      </div>
      <section className='search-results-container'>
        {MOVIES.map(({ id, genres, poster_path, release_date, title, vote_average }) => (
          <Card
            key={id}
            description={genres.join(', ')}
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

export default SearchResults
