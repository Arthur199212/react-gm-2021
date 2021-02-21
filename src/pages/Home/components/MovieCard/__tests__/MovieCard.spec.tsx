import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  DropdownTestIds,
  DropdownItemTestIds,
  ModalTestIds,
  ShowMoreButtonTestIds,
  SmallModalTestIds
} from '@app/components'
import { MovieCard } from '@app/pages/Home/components'
import { FormTestIds } from '../../Form'

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
    render(<MovieCard {...mockProps} />)

    // not visible
    expect(screen.getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(screen.getByTestId(ShowMoreButtonTestIds.BUTTON))
    expect(screen.getByTestId(DropdownTestIds.DROPDOWN).classList).toContain('open')

    // click outside occurres -> not visible
    fireEvent.click(document)
    expect(screen.getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')

    // visible after click
    fireEvent.click(screen.getByTestId(ShowMoreButtonTestIds.BUTTON))
    expect(screen.getByTestId(DropdownTestIds.DROPDOWN).classList).toContain('open')

    // chick on dropdown item occurres -> not visible
    fireEvent.click(screen.getAllByTestId(DropdownItemTestIds.DROPDOWN_ITEM)[0])
    expect(screen.getByTestId(DropdownTestIds.DROPDOWN).classList).not.toContain('open')
  })

  it('while clicking on dropdown item Edit should open modal', () => {
    render(<MovieCard {...mockProps} />)

    fireEvent.click(screen.getByText('Edit'))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).toContain('open')
  })

  it('while clicking on close icon Edit modal should close', () => {
    render(<MovieCard {...mockProps} />)

    fireEvent.click(screen.getByTestId(FormTestIds.CLOSE_ICON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).not.toContain('open')
  })

  it('while clicking on dropdown item Delete should open small modal', () => {
    render(<MovieCard {...mockProps} />)

    fireEvent.click(screen.getByText('Delete'))

    expect(screen.getAllByTestId(SmallModalTestIds.CONTAINER)[1].classList).toContain('open')
  })

  it(`while clicking on 'Confirm' button in Delete modal should close small modal`, () => {
    render(<MovieCard {...mockProps} />)

    fireEvent.click(screen.getByText(/confirm/i))

    expect(screen.getAllByTestId(SmallModalTestIds.CONTAINER)[1].classList).not.toContain('open')
  })
})
