import { screen } from '@testing-library/react'
import { rest } from 'msw'
import React from 'react'
import { Route } from 'react-router-dom'
import { SearchResults, SearchResultsTestIds } from '@app/components'
import { API_URL } from '@app/config'
import { RoutePath } from '@app/features/MoviePage/__tests__/node_modules/@app/routes'
import { render } from '@app/tests/testing-utils'
import { server } from '@app/tests/mocks/server'

describe('SearchResults Component', () => {
  const route = '/search/test'

  it('should handle query URL param', async () => {
    render(
      <Route path={RoutePath.SEARCH_RESULTS}>
        <SearchResults />
      </Route>,
      { route }
    )

    expect(await screen.findByTestId(SearchResultsTestIds.CONTAINER)).toBeInTheDocument()
  })

  it('should work properly in case of an error', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(
      <Route path={RoutePath.SEARCH_RESULTS}>
        <SearchResults />
      </Route>,
      { route }
    )

    expect(
      await screen.findByText(/Sorry, but nothing matched your search criteria/i)
    ).toBeInTheDocument()
  })

  it('should work properly in case of no data recieved', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.json({ data: [], limit: 8, offset: 0, totalAmount: 0 }))
      })
    )
    render(
      <Route path={RoutePath.SEARCH_RESULTS}>
        <SearchResults />
      </Route>,
      { route }
    )

    expect(
      await screen.findByText(/Sorry, but nothing matched your search criteria/i)
    ).toBeInTheDocument()
  })
})
