import React from 'react'
import { Header } from '@app/features/MoviePage/components'
import { render } from '@app/tests/testing-utils'

describe('Header Component', () => {
  it('should render properly', () => {
    const { asFragment } = render(<Header />)

    expect(asFragment).toMatchSnapshot()
  })
})
