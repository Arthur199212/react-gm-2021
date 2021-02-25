import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Search, Movie, NotFound } from '@app/pages'

export enum RoutePaths {
  MOVIE = '/movie/:movieId',
  ROOT = '/',
  SEARCH = '/search',
  SEARCH_RESULTS = '/search/:query'
}

export const AppRoutes = () => (
  <Switch>
    <Route exact path={RoutePaths.ROOT}>
      <Redirect to={RoutePaths.SEARCH} />
    </Route>
    <Route path={RoutePaths.MOVIE}>
      <Movie />
    </Route>
    <Route exact path={RoutePaths.SEARCH}>
      <Search />
    </Route>
    <Route path={RoutePaths.SEARCH_RESULTS}>
      <Search />
    </Route>
    <Route path={RoutePaths.ROOT}>
      <NotFound />
    </Route>
  </Switch>
)
