import React from 'react'
import { render, screen } from '@testing-library/react'
import { MovieDetails } from '@app/pages/Movie/components'
import { MOVIE } from '@app/tests/mock-data'

describe('MovieDetails Component', () => {
  it('should render properly', () => {
    render(<MovieDetails movie={MOVIE} />)

    expect(screen.getByText(MOVIE.title)).toBeInTheDocument()
    expect(screen.getByText(MOVIE.tagline)).toBeInTheDocument()
    expect(screen.getByText(MOVIE.releaseDate)).toBeInTheDocument()
    expect(screen.getByText(MOVIE.overview)).toBeInTheDocument()
  })
})
