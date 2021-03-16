import { screen } from '@testing-library/react'
import React from 'react'
import { SearchResultsTestIds } from '@app/components'
import { SearchPage } from '@app/features'
import { SearchStatus } from '@app/features/SearchPage/store'
import { INITIAL_APP_STATE, RootState } from '@app/store'
import { MOCK_MOVIES } from '@app/tests/mocks/mock-data'
import { render } from '@app/tests/testing-utils'

describe('SearchPage feature', () => {
  const state: RootState = {
    ...INITIAL_APP_STATE,
    search: {
      ...INITIAL_APP_STATE.search,
      movies: MOCK_MOVIES,
      status: SearchStatus.SUCCESS,
      totalAmount: MOCK_MOVIES.length
    }
  }

  it('should render properly', async () => {
    const { asFragment } = render(<SearchPage />, { state })

    await screen.findByTestId(SearchResultsTestIds.CONTAINER)

    expect(asFragment()).toMatchSnapshot()
  })
})
