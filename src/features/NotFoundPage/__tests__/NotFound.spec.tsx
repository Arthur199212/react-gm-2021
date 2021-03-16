import { screen } from '@testing-library/react'
import React from 'react'
import { NotFoundPage } from '@app/features'
import { render } from '@app/tests/testing-utils'

describe('NotFound Component', () => {
  it('should render properly', () => {
    render(<NotFoundPage />)

    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
    expect(screen.getByText(/go home/i)).toBeInTheDocument()
  })
})
