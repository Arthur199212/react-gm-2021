import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { EditMovieFormTestIds, ModalTestIds } from '@app/components'
import { Header, HeaderTestIds } from '@app/pages/Search/components'
import { render } from '@app/tests/testing-utils'

describe('Header Component', () => {
  const setup = () => render(<Header />)

  it('add movie modal should work', () => {
    setup()

    fireEvent.click(screen.getByTestId(HeaderTestIds.BUTTON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).toContain('open')

    fireEvent.click(screen.getByTestId(EditMovieFormTestIds.CLOSE_ICON))

    expect(screen.getByTestId(ModalTestIds.CONTAINER).classList).not.toContain('open')
  })
})
