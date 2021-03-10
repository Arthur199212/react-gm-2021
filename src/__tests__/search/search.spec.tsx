import { rest } from 'msw'
import React from 'react'
import { API_URL } from '@app/config'
import { SearchStatus } from '@app/features/SearchPage/store'
import SearchPage, { getServerSideProps } from '@app/pages/search/[query]'
import { INITIAL_APP_STATE, RootState } from '@app/store'
import { render } from '@app/tests/testing-utils'
import { MOCK_MOVIES } from '@app/tests/mocks/mock-data'
import { server } from '@app/tests/mocks/server'

describe('Search Page', () => {
  it('should render properly', async () => {
    const state: RootState = {
      ...INITIAL_APP_STATE,
      search: {
        ...INITIAL_APP_STATE.search,
        movies: MOCK_MOVIES,
        status: SearchStatus.SUCCESS,
        totalAmount: MOCK_MOVIES.length
      }
    }
    const { asFragment } = render(<SearchPage />, { state })

    expect(asFragment()).toMatchSnapshot()
  })

  it('getServerSideProps should work properly', async () => {
    const query = { query: 'test' }
    const {
      props: { preloadedState }
    } = await getServerSideProps({ query } as any)

    expect(preloadedState.search.movies).toEqual(MOCK_MOVIES)
    expect(preloadedState.search.status).toEqual(SearchStatus.SUCCESS)
  })

  it('getServerSideProps should work properly in case of an error', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const query = { query: 'test' }
    const {
      props: { preloadedState }
    } = await getServerSideProps({ query } as any)

    expect(preloadedState.search.movies).toEqual([])
    expect(preloadedState.search.status).toEqual(SearchStatus.ERROR)
  })
})
