import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '@app/pages'

describe('Home Component', () => {
  it('should render properly', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FIND YOUR MOVIE')
    expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument()
  })

  it('search input should work properly', () => {
    const textMock = 'test'
    render(<Home />)
    const input = screen.getByPlaceholderText('What do you want to watch?') as HTMLInputElement

    userEvent.type(input, textMock)
    expect(input.value).toBe(textMock)

    fireEvent.keyDown(input, { key: 'Esc' })
    expect(input.value).toBe(textMock)

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input.value).toBe('')
  })
})
