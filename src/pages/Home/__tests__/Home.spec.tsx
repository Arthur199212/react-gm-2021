import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from '@app/pages'

describe('Home Component', () => {
  it('should render properly', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FIND YOUR MOVIE')
    expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument()
  })
})
