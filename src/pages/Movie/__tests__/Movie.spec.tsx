import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { FiltersTestIds, SearchResultsTestIds } from '@app/components'
import { Movie } from '@app/pages'

describe('Movie Component', () => {
  it('should render properly', () => {
    render(
      <Router>
        <Movie />
      </Router>
    )

    expect(screen.getByTestId(FiltersTestIds.CONTAINER)).toBeInTheDocument()
    expect(screen.getByTestId(SearchResultsTestIds.CONTAINER)).toBeInTheDocument()
  })
})
