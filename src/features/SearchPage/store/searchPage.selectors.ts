import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { SearchFilter, SearchState, SortBy } from './searchPage.slice'

const selectSearchState = (state: RootState): SearchState => state.search

export const selectQuery = createSelector(selectSearchState, state => state.query)

export const selectSearchFilter = createSelector(selectSearchState, state => state.filter)

export const selectSearchMovies = createSelector(selectSearchState, state => state.movies)

export const selectSearchQuery = createSelector(selectSearchState, state => state.searchQuery)

export const selectSortBy = createSelector(selectSearchState, state => state.sortBy)

export const selectSearchStatus = createSelector(selectSearchState, state => state.status)

export const selectSearchTotalAmount = createSelector(selectSearchState, state => state.totalAmount)

export const selectFilteredAndSortedMovies = createSelector(
  selectSearchMovies,
  selectSearchFilter,
  selectSortBy,
  (movies, filter, sortingOption) =>
    movies
      .filter(
        ({ genres }) =>
          filter === SearchFilter.ALL || genres?.some(genre => genre.toLowerCase().includes(filter))
      )
      .sort((a, b) => {
        if (sortingOption === SortBy.RATING) return b.vote_average - a.vote_average

        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      })
)
