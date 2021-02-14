import React from 'react'
import { render } from 'react-dom'
import { App, ErrorBoundary } from './components'
import 'normalize.css'
import './styles/index.scss'

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')
)
