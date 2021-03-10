import { NextPageContext } from 'next'
import { fetchMovieThunk } from '@app/features/MoviePage/store'
import { createStore } from '@app/store'

export { MoviePage as default } from '@app/features'

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const store = createStore()
  await store.dispatch(fetchMovieThunk(query.movieId as string))

  return { props: { preloadedState: store.getState() } }
}
