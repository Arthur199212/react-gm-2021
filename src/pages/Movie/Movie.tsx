import React, { useState } from 'react'
import { Filters, Footer, SearchResults, SORT_BY_OPTIONS, TABS } from '@app/components'
import { MOVIE } from '@app/tests/mock-data'
import { Header, MovieDetails } from './components'
import './Movie.scss'

export const Movie = () => {
  const [filter, setFilter] = useState<string>(TABS[0])
  const [sortBy, setSortBy] = useState<string>(SORT_BY_OPTIONS[0])

  return (
    <>
      <div className='app-movie-page content'>
        <Header />
        <main className='main'>
          <MovieDetails movie={MOVIE} />
          <div className='container'>
            <Filters
              filter={filter}
              onFilterSelect={setFilter}
              onSortBySelect={setSortBy}
              sortBy={sortBy}
            />
            <SearchResults />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
