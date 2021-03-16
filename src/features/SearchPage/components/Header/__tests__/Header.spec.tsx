import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { ModalTestIds } from '@app/components'
import { AddMovieFormTestIds } from '@app/features'
import { Header, HeaderTestIds } from '@app/features/SearchPage/components'
import { render } from '@app/tests/testing-utils'

describe('Header Component', () => {
  const setup = () => render(<Header />)

  it('add movie modal should work', () => {
    setup()

    fireEvent.click(screen.getByTestId(HeaderTestIds.BUTTON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).toContain('open')

    fireEvent.click(screen.getByTestId(AddMovieFormTestIds.CLOSE_ICON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).not.toContain('open')
  })
})
