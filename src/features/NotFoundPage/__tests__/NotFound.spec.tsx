import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotFoundPage } from '@app/features'

describe('NotFound Component', () => {
  it('should render properly', () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    )
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
    expect(screen.getByText(/go home/i)).toBeInTheDocument()
  })
})
