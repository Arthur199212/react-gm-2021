import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, NotFound } from '@app/pages'

enum RoutePaths {
  ROOT = '/'
}

export const AppRoutes = () => (
  <Switch>
    <Route exact path={RoutePaths.ROOT}>
      <Home />
    </Route>
    <Route path={RoutePaths.ROOT}>
      <NotFound />
    </Route>
  </Switch>
)
