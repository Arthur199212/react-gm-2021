import React from 'react'
import MoviePage, { getServerSideProps } from '@app/pages/movie/[movieId]'
import { render } from '@app/tests/testing-utils'
import { MOCK_MOVIE } from '@app/tests/mocks/mock-data'

describe('Movie Page', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<MoviePage />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('getServerSideProps should work properly', async () => {
    const {
      props: { preloadedState }
    } = await getServerSideProps({ query: { movieId: '1' } } as any)

    expect(preloadedState.movie).toEqual({ movie: MOCK_MOVIE, status: 'success' })
  })
})
