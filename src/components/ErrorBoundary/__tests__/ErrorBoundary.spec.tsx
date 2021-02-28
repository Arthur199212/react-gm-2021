import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@app/components/ErrorBoundary'

describe('ErrorBoundary Component', () => {
  it('should render child', () => {
    const testText = 'Test text'
    render(<ErrorBoundary>{testText}</ErrorBoundary>)
    expect(screen.getByText(testText)).toBeInTheDocument()
  })

  it(`shows the fallback when there's an error`, () => {
    const ComponentWithError = () => {
      throw new Error('test')
    }
    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    )
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument()
  })
})
