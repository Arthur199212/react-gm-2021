import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { CardMedia } from '@app/components'

describe('CardMedia Component', () => {
  const mockProps = {
    image: 'test-image-url',
    title: 'test title'
  }

  it('should render properly', () => {
    render(<CardMedia {...mockProps} />)
    const image = screen.getByRole('img')

    expect(image).toHaveAttribute('alt', mockProps.title)
    expect(image).toHaveAttribute('src', mockProps.image)
  })

  it('should render error message if somethign goes wrong', () => {
    render(<CardMedia {...mockProps} />)

    fireEvent.error(screen.getByRole('img'))

    expect(screen.queryByText(/image not found/i)).toBeInTheDocument()
  })
})
