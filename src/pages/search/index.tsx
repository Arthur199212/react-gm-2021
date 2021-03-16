import { NextPageContext } from 'next'
import { fetchMoviesDefaultThunk } from '@app/features/SearchPage/store'
import { createStore } from '@app/store'

export { SearchPage as default } from '@app/features'

export const getServerSideProps = async (props: NextPageContext) => {
  const store = createStore()
  await store.dispatch(fetchMoviesDefaultThunk())

  return { props: { preloadedState: store.getState() } }
}
