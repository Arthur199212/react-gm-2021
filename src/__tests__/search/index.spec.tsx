import { rest } from 'msw'
import React from 'react'
import { API_URL } from '@app/config'
import IndexSearchPage, { getServerSideProps } from '@app/pages/search/index'
import { MOCK_MOVIES } from '@app/tests/mocks/mock-data'
import { server } from '@app/tests/mocks/server'
import { render } from '@app/tests/testing-utils'
import { SearchStatus } from '@app/features/SearchPage/store'

describe('IndexSearch Page', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<IndexSearchPage />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('getServerSideProps should work properly', async () => {
    const {
      props: { preloadedState }
    } = await getServerSideProps({} as any)

    expect(preloadedState.search.movies).toEqual(MOCK_MOVIES)
    expect(preloadedState.search.status).toEqual(SearchStatus.SUCCESS)
  })

  it('getServerSideProps should work properly in case of an error', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const {
      props: { preloadedState }
    } = await getServerSideProps({} as any)

    expect(preloadedState.search.movies).toEqual([])
    expect(preloadedState.search.status).toEqual(SearchStatus.ERROR)
  })
})
