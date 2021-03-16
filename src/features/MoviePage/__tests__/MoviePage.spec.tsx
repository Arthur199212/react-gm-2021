import React from 'react'
import { MoviePage } from '@app/features'
import { MovieStatus } from '@app/features/MoviePage/store'
import { INITIAL_APP_STATE, RootState } from '@app/store'
import { MOCK_MOVIE } from '@app/tests/mocks/mock-data'
import { render } from '@app/tests/testing-utils'

describe('MoviePage feature', () => {
  const state: RootState = {
    ...INITIAL_APP_STATE,
    movie: { movie: MOCK_MOVIE, status: MovieStatus.SUCCESS }
  }

  it('should render properly', () => {
    const { asFragment } = render(<MoviePage />, { state })

    expect(asFragment).toMatchSnapshot()
  })
})
