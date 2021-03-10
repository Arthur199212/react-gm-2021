import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { rest } from 'msw'
import { GenresFormFieldTestIds } from '@app/components'
import { AddMovieForm, AddMovieFormProps, AddMovieFormTestIds } from '@app/features'
import { API_URL } from '@app/config'
import { render } from '@app/tests/testing-utils'
import { server } from '@app/tests/mocks/server'

describe('AddMovieForm Component', () => {
  const onClose = jest.fn()
  const defaultProps: AddMovieFormProps = {
    onClose,
    open: true
  }
  const mockText = 'test'
  const setup = (props: AddMovieFormProps = defaultProps) => render(<AddMovieForm {...props} />)

  it('select genre works properly', () => {
    setup()

    const genreInput = screen.getByLabelText(/genre/i) as HTMLInputElement

    // open genres modal
    fireEvent.click(genreInput)
    expect(screen.getByTestId(GenresFormFieldTestIds.SMALL_MODAL).classList).toContain('open')

    // close genres modal
    fireEvent.click(genreInput)
    expect(screen.getByTestId(GenresFormFieldTestIds.SMALL_MODAL).classList).not.toContain('open')

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

    // wait for update of input
    await screen.findByLabelText(/title/i)

    expect(input.value).not.toBe(mockText)
  })

  it('submit button works properly', async () => {
    setup()
    const title = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(title, mockText)
    expect(title.value).toBe(mockText)

    fireEvent.click(screen.getByLabelText(/submit/i))

    expect(await screen.findByTestId(AddMovieFormTestIds.SUCCESS_ICON)).toBeInTheDocument()
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
