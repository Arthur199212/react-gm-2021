import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Card } from '@app/components'
import { DropdownTestIds } from '@app/components/Dropdown'
import { DropdownItemTestIds } from '@app/components/DropdownItem'
import { ShowMoreButtonTestIds } from '@app/components/ShowMoreButton'

describe('Card Component', () => {
  it('should render properly', () => {
    const mockProps = {
      description: 'test description',
      image: 'test-image-url',
      rating: 7,
      release: '2021',
      title: 'test title'
    }
    render(<Card {...mockProps} />)
    expect(screen.getByText(mockProps.description)).toBeInTheDocument()
    expect(screen.getByText(mockProps.release)).toBeInTheDocument()
  })

  it('should show dropdown if ShowMoreButton was chicked', () => {
    const mockProps = {
      description: 'test description',
      image: 'test image',
      rating: 7,
      release: '2021',
      title: 'test title'
    }
    const { getByTestId, getAllByTestId } = render(<Card {...mockProps} />)

    // not visible
    expect(getByTestId(DropdownTestIds.dropdown).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(ShowMoreButtonTestIds.button))
    expect(getByTestId(DropdownTestIds.dropdown).classList).toContain('open')

    // click outside occurres -> not visible
    fireEvent.click(document)
    expect(getByTestId(DropdownTestIds.dropdown).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(ShowMoreButtonTestIds.button))
    expect(getByTestId(DropdownTestIds.dropdown).classList).toContain('open')

    // chick on dropdown item occurres -> not visible
    fireEvent.click(getAllByTestId(DropdownItemTestIds.dropdownItem)[0])
    expect(getByTestId(DropdownTestIds.dropdown).classList).not.toContain('open')
  })
})
