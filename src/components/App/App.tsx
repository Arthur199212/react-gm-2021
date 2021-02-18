import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from '@app/routes'

export const App = () => (
  <Router>
    <AppRoutes />
  </Router>
)
