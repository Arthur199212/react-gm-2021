import React from 'react'
import { DualRingSpinner, MovieCard, NoSearchResults } from '@app/components'
import { useAppSelector } from '@app/hooks'
import {
  SearchStatus,
  selectFilteredAndSortedMovies,
  selectSearchStatus,
  selectSearchTotalAmount
} from '@app/pages/Search/store'
import { sortGenresAlphabetically } from '@app/utils'
import { SearchResultsTestIds } from './SearchResults.constants'
import './SearchResults.scss'

export const SearchResults = () => {
  const movies = useAppSelector(selectFilteredAndSortedMovies)
  const status = useAppSelector(selectSearchStatus)
  const totalAmount = useAppSelector(selectSearchTotalAmount)

  if (status === SearchStatus.NO_RESULTS || status === SearchStatus.ERROR) {
    return <NoSearchResults />
  }

  if (status === SearchStatus.LOADING) {
    return (
      <div className='search-results-container centered'>
        <DualRingSpinner />
      </div>
    )
  }

  return (
    <>
      <div className='movies-count-box'>
        <span className='movies-count'>{totalAmount}</span> movies found
      </div>
      <section className='search-results-container' data-testid={SearchResultsTestIds.CONTAINER}>
        {movies?.map(({ id, genres, poster_path, release_date, title, vote_average }) => (
          <MovieCard
            key={id}
            description={sortGenresAlphabetically(genres)}
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
