import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@app/store'
import { App } from '@app/components'

describe('App component', () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

  it('should render properly', () => {
    const { asFragment } = setup()

    expect(asFragment()).toMatchSnapshot()
  })
})
