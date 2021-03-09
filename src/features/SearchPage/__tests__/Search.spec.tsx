import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { SearchPage } from '@app/features'
import { store } from '@app/store'

describe('Search Page', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <Router>
          <SearchPage />
        </Router>
      </Provider>
    )

  it('should render properly', () => {
    const { asFragment } = setup()

    expect(asFragment()).toMatchSnapshot()
  })
})
