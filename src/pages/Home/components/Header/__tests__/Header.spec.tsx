import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ModalTestIds } from '@app/components'
import { FormTestIds, Header, HeaderTestIds } from '@app/pages/Home/components'

describe('Header Component', () => {
  it('add button click should open modal', () => {
    render(<Header />)

    fireEvent.click(screen.getByTestId(HeaderTestIds.BUTTON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).toContain('open')
  })

  it('modal should be closed on close icon click', () => {
    render(<Header />)

    fireEvent.click(screen.getByTestId(FormTestIds.CLOSE_ICON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).not.toContain('open')
  })
})
