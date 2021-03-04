import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { rest } from 'msw'
import {
  EditMovieForm,
  EditMovieFormProps,
  EditMovieFormTestIds,
  SmallModalTestIds
} from '@app/components'
import { API_URL } from '@app/config'
import { render } from '@app/tests/testing-utils'
import { server } from '@app/tests/mocks/server'
import { MOCK_MOVIE } from '@app/tests/mocks/mock-data'

describe('MovieForm Component', () => {
  const onClose = jest.fn()
  const defaultProps: EditMovieFormProps = {
    // content: MovieFormContent.CREATE,
    movieId: '1',
    onClose,
    open: true
  }
  const mockText = 'test'
  const setup = (props: EditMovieFormProps = defaultProps) => render(<EditMovieForm {...props} />)

  it('should render properly in MovieFormContent type is Create', () => {
    const { asFragment } = setup()

    expect(asFragment).toMatchSnapshot()
  })

  it('should render properly in MovieFormContent type is Edit', async () => {
    const { asFragment } = setup({
      ...defaultProps,
      // content: MovieFormContent.EDIT,
      movieId: '1'
    })

    expect(asFragment).toMatchSnapshot()
  })

  it('should show error message in case of an error while fetching movie to Edit', async () => {
    server.use(
      rest.get(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    setup({
      ...defaultProps,
      // content: MovieFormContent.EDIT,
      movieId: '1'
    })

    expect(await screen.findByText(/sorry, something went wrong/i)).toBeInTheDocument()
  })

  it('select genre works properly', () => {
    setup()

    const genreInput = screen.getByLabelText(/genre/i) as HTMLInputElement

    // open genres modal
    fireEvent.click(genreInput)
    expect(screen.getByTestId(SmallModalTestIds.CONTAINER).classList).toContain('open')

    // close genres modal
    fireEvent.click(genreInput)
    expect(screen.getByTestId(SmallModalTestIds.CONTAINER).classList).not.toContain('open')

    // click on 'comedy' genre
    fireEvent.click(screen.getByLabelText(/comedy/i))

    // genre input has 'comedy' genre
    expect(genreInput.value).toBe('Comedy')

    // click on 'documentary' genre
    fireEvent.click(screen.getByLabelText(/documentary/i))

    // genre input has 'comedy' & 'documentary' genres
    expect(genreInput.value).toBe('Comedy, Documentary')

    // click on 'documentary' genre again
    fireEvent.click(screen.getByLabelText(/documentary/i))

    // genre input has only 'comedy' genre
    expect(genreInput.value).toBe('Comedy')
  })

  it('select genre input does NOT allow to type in', () => {
    setup()

    const genreInput = screen.getByLabelText(/genre/i) as HTMLInputElement

    userEvent.type(genreInput, mockText)
    expect(genreInput.value).toBe('')
  })

  it('form field input works properly', () => {
    setup()

    const input = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)
  })

  it('reset button should work properly', async () => {
    setup()
    const input = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/reset/i))

    const movieForm = await waitFor(() => screen.queryByTestId(EditMovieFormTestIds.CONTAINER))
    expect(movieForm).not.toBeInTheDocument()
  })

  it('submit button works properly', async () => {
    setup()
    const input = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByTestId(EditMovieFormTestIds.SUCCESS_ICON)).toBeInTheDocument()
  })

  it('works properly in case of editing a movie', async () => {
    setup({
      ...defaultProps,
      // content: MovieFormContent.EDIT,
      movieId: '1'
    })
    const input = (await screen.findByLabelText(/title/i)) as HTMLInputElement

    expect(input.value).toBe(MOCK_MOVIE.title)

    userEvent.clear(input)
    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByTestId(EditMovieFormTestIds.SUCCESS_ICON)).toBeInTheDocument()
  })

  it('should work properly in case of an error while editing a movie', async () => {
    server.use(
      rest.put(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    setup({
      ...defaultProps,
      // content: MovieFormContent.EDIT,
      movieId: '1'
    })
    const input = (await screen.findByLabelText(/title/i)) as HTMLInputElement

    expect(input.value).toBe(MOCK_MOVIE.title)

    userEvent.clear(input)
    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByText(/sorry, something went wrong/i)).toBeInTheDocument()
  })

  it('should work properly in case of an error while creating a movie', async () => {
    server.use(
      rest.post(`${API_URL}/movies`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    setup()
    const input = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByText(/sorry, something went wrong/i)).toBeInTheDocument()
  })
})
