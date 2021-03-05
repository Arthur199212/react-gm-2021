import React from 'react'
import { Header } from '@app/pages/Movie/components'
import { render } from '@app/tests/testing-utils'

describe('Header Component', () => {
  it('should render properly', () => {
    const { asFragment } = render(<Header />)

    expect(asFragment).toMatchSnapshot()
  })
})
