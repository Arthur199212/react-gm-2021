import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MovieCard } from '@app/pages/Home/components'
import { DropdownTestIds } from '@app/components/Dropdown'
import { DropdownItemTestIds } from '@app/components/DropdownItem'
import { ShowMoreButtonTestIds } from '@app/components/ShowMoreButton'

describe('MovieCard Component', () => {
  const mockProps = {
    description: 'test description',
    id: '00001',
    image: 'test-image-url',
    rating: 7,
    release: '2021',
    title: 'test title'
  }

  it('should render properly', () => {
    render(<MovieCard {...mockProps} />)
    expect(screen.getByText(mockProps.description)).toBeInTheDocument()
    expect(screen.getByText(mockProps.release)).toBeInTheDocument()
  })

  it('should show dropdown if ShowMoreButton was chicked', () => {
    const { getByTestId, getAllByTestId } = render(<MovieCard {...mockProps} />)

    // not visible
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(ShowMoreButtonTestIds.BUTTON))
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).toContain('open')

    // click outside occurres -> not visible
    fireEvent.click(document)
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(getByTestId(ShowMoreButtonTestIds.BUTTON))
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).toContain('open')

    // chick on dropdown item occurres -> not visible
    fireEvent.click(getAllByTestId(DropdownItemTestIds.DROPDOWN_ITEM)[0])
    expect(getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')
  })
})
