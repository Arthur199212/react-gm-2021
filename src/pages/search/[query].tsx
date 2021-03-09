import { NextPageContext } from 'next'
import { setSearchQuery, setSearchResult } from '@app/features/SearchPage/store'
import { moviesService } from '@app/services'
import { createStore } from '@app/store'

export { SearchPage as default } from '@app/features'

export const getServerSideProps = async ({ query }: NextPageContext) => {
  const res = await moviesService.fetchMovies(query.query as string)

  const store = createStore()
  store.dispatch(setSearchQuery(query.query as string))
  store.dispatch(setSearchResult(res))

  return { props: { preloadedState: store.getState() } }
}
