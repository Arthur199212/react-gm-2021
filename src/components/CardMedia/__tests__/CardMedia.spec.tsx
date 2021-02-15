import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { CardMedia } from '@app/components'

describe('CardMedia Component', () => {
  it('should render properly', () => {
    const mockProps = {
      imageUrl: 'test-image-url',
      title: 'test title'
    }
    render(<CardMedia {...mockProps} />)
    const image = screen.getByRole('img')

    expect(image).toHaveAttribute('alt', mockProps.title)
    expect(image).toHaveAttribute('src', mockProps.imageUrl)
  })

  it('should render error message if somethign goes wrong', () => {
    const mockProps = {
      imageUrl: 'test-image-url',
      title: 'test title'
    }
    render(<CardMedia {...mockProps} />)

    fireEvent.error(screen.getByRole('img'))

    expect(screen.queryByText(/image not found/i)).toBeInTheDocument()
  })
})
