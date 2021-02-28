import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from '@app/pages'

enum ROUTE_PATHS {
  Root = '/'
}

const AppRoutes = () => (
  <Switch>
    <Route exact path={ROUTE_PATHS.Root}>
      <Home />
    </Route>
    <Route path={ROUTE_PATHS.Root}>404: Page Not Found</Route>
  </Switch>
)

export default AppRoutes
