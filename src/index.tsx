import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App, ErrorBoundary } from './components'
import { store } from './store'
import 'normalize.css'
import './styles/index.scss'

render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('app')
)
