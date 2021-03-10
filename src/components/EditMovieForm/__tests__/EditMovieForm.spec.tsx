import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import {
  EditMovieForm,
  EditMovieFormProps,
  EditMovieFormTestIds,
  GenresFormFieldTestIds
} from '@app/components'
import { render } from '@app/tests/testing-utils'
import { server } from '@app/tests/mocks/server'
import { API_URL } from '@app/config'
import { rest } from 'msw'
import { MOCK_MOVIE } from '@app/tests/mocks/mock-data'

describe('MovieForm Component', () => {
  const onClose = jest.fn()
  const defaultProps: EditMovieFormProps = {
    movieId: String(MOCK_MOVIE.id),
    onClose,
    open: true
  }
  const mockText = 'test'
  const setup = (props: EditMovieFormProps = defaultProps) => render(<EditMovieForm {...props} />)

  it('should show error message in case of an error while fetching movie to Edit', async () => {
    server.use(
      rest.get(`${API_URL}/movies/:movieId`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    setup()

    expect(await screen.findByText(/sorry, something went wrong/i)).toBeInTheDocument()
  })

  it('select genre works properly', async () => {
    setup()

    const genreInput = (await screen.findByLabelText(/genre/i)) as HTMLInputElement

    // open genres modal
    fireEvent.click(genreInput)
    expect(screen.getByTestId(GenresFormFieldTestIds.SMALL_MODAL).classList).toContain('open')

    // close genres modal
    fireEvent.click(genreInput)
    expect(screen.getByTestId(GenresFormFieldTestIds.SMALL_MODAL).classList).not.toContain('open')

    const mockGenre = MOCK_MOVIE.genres[0]
    const genreRegExp = new RegExp(mockGenre, 'i')

    // click on 'comedy' genre
    fireEvent.click(screen.getByLabelText(genreRegExp))

    // wait for update of input
    await screen.findByLabelText(/genre/i)

    // genre input has 'comedy' genre
    expect(genreInput.value).not.toContain(mockGenre)

    // click on 'documentary' genre
    fireEvent.click(screen.getByLabelText(genreRegExp))

    // wait for update of input
    await screen.findByLabelText(/genre/i)

    // genre input has 'comedy' & 'documentary' genres
    expect(genreInput.value).toContain(mockGenre)
  })

  it('select genre input does NOT allow to type in', async () => {
    setup()

    const genreInput = (await screen.findByLabelText(/genre/i)) as HTMLInputElement

    userEvent.type(genreInput, mockText)

    const mockGenre = MOCK_MOVIE.genres[0]
    expect(genreInput.value).toBe(mockGenre)
  })

  it('reset button should work properly', async () => {
    setup()
    const input = (await screen.findByLabelText(/title/i)) as HTMLInputElement

    userEvent.clear(input)
    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/reset/i))

    const inputAfterReset = (await screen.findByLabelText(/title/i)) as HTMLInputElement
    expect(inputAfterReset.value).toBe(MOCK_MOVIE.title)
  })

  it('submit button works properly', async () => {
    setup()
    const input = (await screen.findByLabelText(/title/i)) as HTMLInputElement

    userEvent.clear(input)
    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByTestId(EditMovieFormTestIds.SUCCESS_ICON)).toBeInTheDocument()
  })

  it('works properly in case of editing a movie', async () => {
    setup()
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
    setup()
    const input = (await screen.findByLabelText(/title/i)) as HTMLInputElement

    expect(input.value).toBe(MOCK_MOVIE.title)

    userEvent.clear(input)
    userEvent.type(input, mockText)
    expect(input.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByText(/sorry, something went wrong/i)).toBeInTheDocument()
  })
})
