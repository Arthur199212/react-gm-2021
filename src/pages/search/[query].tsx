import { NextPageContext } from 'next'
import { fetchMoviesThunk } from '@app/features/SearchPage/store'
import { createStore } from '@app/store'

export { SearchPage as default } from '@app/features'

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const store = createStore()
  await store.dispatch(fetchMoviesThunk(query.query as string))

  return { props: { preloadedState: store.getState() } }
}
