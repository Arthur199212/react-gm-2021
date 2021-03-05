import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Search } from '@app/pages'

describe('Search Component', () => {
  it('should render properly', () => {
    render(
      <Router>
        <Search />
      </Router>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FIND YOUR MOVIE')
  })
})
