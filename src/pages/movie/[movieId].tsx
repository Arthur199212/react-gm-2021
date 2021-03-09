import { NextPageContext } from 'next'
import { setSearchResult as setMovieSearchResult } from '@app/features/MoviePage/store'
import { setSearchResult } from '@app/features/SearchPage/store'
import { moviesService, SearchBy } from '@app/services'
import { createStore } from '@app/store'

export { MoviePage as default } from '@app/features'

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const movie = await moviesService.fetchMovie(query.movieId as string)

  const store = createStore()
  store.dispatch(setMovieSearchResult(movie))

  const relatedMovies = await moviesService.fetchMovies(movie.genres[0], SearchBy.GENRES)
  store.dispatch(setSearchResult(relatedMovies))

  return { props: { preloadedState: store.getState() } }
}
