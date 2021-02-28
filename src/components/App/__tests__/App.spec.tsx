import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '@app/components'

describe('App component', () => {
  it('should render properly', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/find your movie/i)
  })
})
