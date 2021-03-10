import { screen } from '@testing-library/react'
import React from 'react'
import { SearchResults, SearchResultsTestIds } from '@app/components'
import { render } from '@app/tests/testing-utils'
import { INITIAL_APP_STATE, RootState } from '@app/store'
import { MOCK_MOVIES } from '@app/tests/mocks/mock-data'
import { SearchStatus } from '@app/features/SearchPage/store'

describe('SearchResults Component', () => {
  it('should render properly', () => {
    const state: RootState = {
      ...INITIAL_APP_STATE,
      search: {
        ...INITIAL_APP_STATE.search,
        movies: MOCK_MOVIES,
        status: SearchStatus.SUCCESS,
        totalAmount: MOCK_MOVIES.length
      }
    }
    render(<SearchResults />, { state })

    expect(screen.getByTestId(SearchResultsTestIds.CONTAINER)).toBeInTheDocument()
  })

  it('should show loadin spinner', () => {
    const state: RootState = {
      ...INITIAL_APP_STATE,
      search: {
        ...INITIAL_APP_STATE.search,
        status: SearchStatus.LOADING
      }
    }
    render(<SearchResults />, { state })

    expect(screen.getByTestId(SearchResultsTestIds.SPINNER)).toBeInTheDocument()
  })

  it('should work properly in case of an error', () => {
    const state: RootState = {
      ...INITIAL_APP_STATE,
      search: {
        ...INITIAL_APP_STATE.search,
        status: SearchStatus.ERROR
      }
    }
    render(<SearchResults />, { state })

    expect(screen.getByText(/Sorry, but nothing matched your search criteria/i)).toBeInTheDocument()
  })

  it('should work properly in case of no data recieved', () => {
    const state: RootState = {
      ...INITIAL_APP_STATE,
      search: {
        ...INITIAL_APP_STATE.search,
        status: SearchStatus.NO_RESULTS
      }
    }
    render(<SearchResults />, { state })

    expect(screen.getByText(/Sorry, but nothing matched your search criteria/i)).toBeInTheDocument()
  })
})
