import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '@app/components'

describe('App Component', () => {
  it('should render properly', () => {
    render(<App />)
    const header = screen.getByRole('heading', { level: 1 })
    expect(header).toHaveTextContent('Hello World')
  })
})
