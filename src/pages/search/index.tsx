import { NextPageContext } from 'next'
import { setSearchResult } from '@app/features/SearchPage/store'
import { moviesService } from '@app/services'
import { createStore } from '@app/store'

export { SearchPage as default } from '@app/features'

export const getServerSideProps = async (props: NextPageContext) => {
  const res = await moviesService.fetchMoviesDefault()

  const store = createStore()
  store.dispatch(setSearchResult(res))

  return { props: { preloadedState: store.getState() } }
}
