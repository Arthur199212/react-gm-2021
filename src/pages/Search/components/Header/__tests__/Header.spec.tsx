import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormTestIds, ModalTestIds } from '@app/components'
import { Header, HeaderTestIds } from '@app/pages/Search/components'

describe('Header Component', () => {
  const setup = () =>
    render(
      <Router>
        <Header />
      </Router>
    )

  it('add button click should open modal', () => {
    setup()

    fireEvent.click(screen.getByTestId(HeaderTestIds.BUTTON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).toContain('open')
  })

  it('modal should be closed on close icon click', () => {
    setup()

    fireEvent.click(screen.getByTestId(FormTestIds.CLOSE_ICON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).not.toContain('open')
  })
})
