import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Header } from '@app/pages/Movie/components'

describe('Header Component', () => {
  it('should render properly', () => {
    render(
      <Router>
        <Header />
      </Router>
    )

    expect(screen.getByText(/moviesearchapp/i)).toBeInTheDocument()
  })
})
