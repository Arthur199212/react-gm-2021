import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { DualRingSpinner, MovieCard, NoSearchResults } from '@app/components'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
  fetchMoviesThunk,
  SearchStatus,
  selectFilteredAndSortedMovies,
  selectSearchQuery,
  selectSearchStatus,
  selectSearchTotalAmount
} from '@app/features/SearchPage/store'
import { sortGenresAlphabetically } from '@app/utils'
import { SearchResultsTestIds } from './SearchResults.constants'

export const SearchResults = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectFilteredAndSortedMovies)
  const status = useAppSelector(selectSearchStatus)
  const searchQuery = useAppSelector(selectSearchQuery)
  const totalAmount = useAppSelector(selectSearchTotalAmount)
  const {
    query: { query }
  } = useRouter()

  useEffect(() => {
    if (query && searchQuery !== query) {
      dispatch(fetchMoviesThunk(query as string))
    }
  }, [dispatch, query, searchQuery])

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
