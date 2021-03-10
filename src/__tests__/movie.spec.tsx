import { rest } from 'msw'
import React from 'react'
import { API_URL } from '@app/config'
import { MovieStatus } from '@app/features/MoviePage/store'
import MoviePage, { getServerSideProps } from '@app/pages/movie/[movieId]'
import { MOCK_MOVIE } from '@app/tests/mocks/mock-data'
import { server } from '@app/tests/mocks/server'
import { render } from '@app/tests/testing-utils'

describe('Movie Page', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<MoviePage />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('getServerSideProps should work properly', async () => {
    const {
      props: { preloadedState }
    } = await getServerSideProps({ query: { movieId: '1' } } as any)

    expect(preloadedState.movie).toEqual({ movie: MOCK_MOVIE, status: MovieStatus.SUCCESS })
  })

  it('getServerSideProps should work properly in case of an error', async () => {
    server.use(
      rest.get(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const {
      props: { preloadedState }
    } = await getServerSideProps({ query: { movieId: '1' } } as any)

    expect(preloadedState.movie).toEqual({ movie: undefined, status: MovieStatus.ERROR })
  })
})
