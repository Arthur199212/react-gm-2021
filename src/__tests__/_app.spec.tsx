import { screen } from '@testing-library/react'
import { Router } from 'next/router'
import React from 'react'
import AppPage from '@app/pages/_app'
import { render } from '@app/tests/testing-utils'
import mockRouter from '@app/tests/mocks/mock-router'

describe('Index Page', () => {
  it('should render properly', async () => {
    const componentMock = () => <div>Test Component</div>
    const pageProps = {} as any
    render(
      <AppPage
        router={(mockRouter as unknown) as Router}
        Component={componentMock as any}
        pageProps={pageProps}
      />
    )

    expect(screen.getByText(/test component/i)).toBeInTheDocument()
  })
})
