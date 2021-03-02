import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Search, Movie, NotFound } from '@app/pages'

export enum RoutePath {
  MOVIE = '/movie/:movieId',
  ROOT = '/',
  SEARCH = '/search',
  SEARCH_RESULTS = '/search/:query'
}

export const AppRoutes = () => (
  <Switch>
    <Route exact path={RoutePath.ROOT}>
      <Redirect to={RoutePath.SEARCH} />
    </Route>
    <Route path={RoutePath.MOVIE}>
      <Movie />
    </Route>
    <Route exact path={RoutePath.SEARCH}>
      <Search />
    </Route>
    <Route path={RoutePath.SEARCH_RESULTS}>
      <Search />
    </Route>
    <Route path={RoutePath.ROOT}>
      <NotFound />
    </Route>
  </Switch>
)
