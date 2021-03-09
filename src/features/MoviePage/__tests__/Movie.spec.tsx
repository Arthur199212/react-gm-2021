import { fireEvent, screen } from '@testing-library/react'
import { rest } from 'msw'
import React from 'react'
import { Route } from 'react-router-dom'
import { API_URL } from '@app/config'
import { MoviePage } from '@app/features'
import { RoutePath } from '@app/routes'
import { MOCK_MOVIE } from '@app/tests/mocks/mock-data'
import { render } from '@app/tests/testing-utils'
import { server } from '@app/tests/mocks/server'
import { EditMovieFormTestIds, SearchResultsTestIds } from '@app/components'
import userEvent from '@testing-library/user-event'

describe('Movie Page', () => {
  const route = '/movie/1'

  it('should render properly', () => {
    const { asFragment } = render(<MoviePage />)

    expect(asFragment).toMatchSnapshot()
  })

  it('should handle movieId URL param', async () => {
    render(
      <Route path={RoutePath.MOVIE}>
        <MoviePage />
      </Route>,
      { route }
    )

    expect(await screen.findByText(MOCK_MOVIE.title)).toBeInTheDocument()
  })

  it('should work properly in case of an Error', async () => {
    server.use(
      rest.get(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(
      <Route path={RoutePath.MOVIE}>
        <MoviePage />
      </Route>,
      { route }
    )

    expect(await screen.findByText(/Sorry, but such a movie was not found/i)).toBeInTheDocument()
  })

  it('should work properly in case of NO related movies recieved', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.json({ data: [], limit: 8, offset: 0, totalAmount: 0 }))
      })
    )
    render(
      <Route path={RoutePath.MOVIE}>
        <MoviePage />
      </Route>,
      { route }
    )

    expect(await screen.findByText(MOCK_MOVIE.title)).toBeInTheDocument()

    expect(
      await screen.findByText(/Sorry, but nothing matched your search criteria/i)
    ).toBeInTheDocument()
  })

  it('should work properly in case of error while fetching related movies', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(
      <Route path={RoutePath.MOVIE}>
        <MoviePage />
      </Route>,
      { route }
    )

    expect(await screen.findByText(MOCK_MOVIE.title)).toBeInTheDocument()

    expect(
      await screen.findByText(/Sorry, but nothing matched your search criteria/i)
    ).toBeInTheDocument()
  })

  it('should update search results if movie was edited', async () => {
    server.use(
      rest.get(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.json({ data: [MOCK_MOVIE], limit: 8, offset: 0, totalAmount: 1 }))
      })
    )
    render(
      <Route path={RoutePath.MOVIE}>
        <MoviePage />
      </Route>,
      { route }
    )

    expect(await screen.findByTestId(SearchResultsTestIds.CONTAINER)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/edit/i))

    const input = (await screen.findByLabelText(/title/i)) as HTMLInputElement

    userEvent.clear(input)
    userEvent.type(input, 'test test')
    expect(input.value).toBe('test test')

    fireEvent.click(screen.getByLabelText(/submit/i))

    const successIcon = await screen.findByTestId(EditMovieFormTestIds.SUCCESS_ICON)
    expect(successIcon).toBeInTheDocument()
  }, 30000)
})
