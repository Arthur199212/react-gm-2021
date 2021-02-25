import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MovieForm, MovieFormContent, SmallModalTestIds } from '@app/components'

describe('MovieForm Component', () => {
  const onClose = jest.fn()

  beforeEach(() => {
    onClose.mockClear()
  })

  it('should render properly in MovieFormContent type is Create', () => {
    // render(<MovieForm content={MovieFormContent.CREATE} onClose={onClose} />)

    expect(screen.queryByLabelText(/movie-id/i)).not.toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/release-date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/movie-url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/overview/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/runtime/i)).toBeInTheDocument()
  })

  it('should render properly in MovieFormContent type is Edit', () => {
    // render(<MovieForm content={MovieFormContent.EDIT} onClose={onClose} />)

    expect(screen.getByLabelText(/movie-id/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/release-date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/movie-url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/overview/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/runtime/i)).toBeInTheDocument()
  })

  it('select genre works properly', () => {
    // render(<MovieForm content={MovieFormContent.EDIT} onClose={onClose} />)
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
    // render(<MovieForm content={MovieFormContent.EDIT} onClose={onClose} />)
    const genreInput = screen.getByLabelText(/genre/i) as HTMLInputElement

    userEvent.type(genreInput, 'test')
    expect(genreInput.value).toBe('')
  })

  it('form field input works properly', () => {
    // render(<MovieForm content={MovieFormContent.CREATE} onClose={onClose} />)
    const input = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(input, 'test')
    expect(input.value).toBe('test')
  })

  it('reset & submit buttons work properly', () => {
    // render(<MovieForm content={MovieFormContent.CREATE} onClose={onClose} />)
    const input = screen.getByLabelText(/title/i) as HTMLInputElement

    userEvent.type(input, 'test')
    expect(input.value).toBe('test')

    fireEvent.click(screen.getByLabelText(/reset/i))
    expect(input.value).toBe('')

    userEvent.type(input, 'test')
    expect(input.value).toBe('test')

    fireEvent.click(screen.getByLabelText(/submit/i))
    expect(input.value).toBe('')
  })
})
