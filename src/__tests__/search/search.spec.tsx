import React from 'react'
import SearchPage, { getServerSideProps } from '@app/pages/search/[query]'
import { render } from '@app/tests/testing-utils'
import { MOCK_MOVIES } from '@app/tests/mocks/mock-data'

describe('Search Page', () => {
  const queryParamsMock = { query: { query: 'test' } }

  it('should render properly', async () => {
    const { asFragment } = render(<SearchPage />, queryParamsMock)

    expect(asFragment()).toMatchSnapshot()
  })

  it('getServerSideProps should work properly', async () => {
    const {
      props: { preloadedState }
    } = await getServerSideProps(queryParamsMock as any)

    expect(preloadedState.search.movies).toEqual(MOCK_MOVIES)
    expect(preloadedState.search.status).toEqual('success')
  })
})
