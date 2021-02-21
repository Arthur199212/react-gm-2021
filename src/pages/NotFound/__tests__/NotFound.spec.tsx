import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotFound } from '@app/pages'

describe('NotFound Component', () => {
  it('should render properly', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
    expect(screen.getByText(/go home/i)).toBeInTheDocument()
  })
})
