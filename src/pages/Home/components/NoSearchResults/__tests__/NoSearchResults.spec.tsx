import React from 'react'
import { render, screen } from '@testing-library/react'
import { NoSearchResults } from '@app/pages/Home/components'

describe('NotFound Component', () => {
  it('should render properly', () => {
    render(<NoSearchResults />)
    expect(screen.getByText(/nothing matched your search criteria/i)).toBeInTheDocument()
  })
})
