import React from 'react'
import IndexSearchPage, { getServerSideProps } from '@app/pages/search/index'
import { render } from '@app/tests/testing-utils'
import { MOCK_MOVIES } from '@app/tests/mocks/mock-data'

describe('IndexSearch Page', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<IndexSearchPage />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('getServerSideProps should work properly', async () => {
    const {
      props: { preloadedState }
    } = await getServerSideProps({} as any)

    expect(preloadedState.search.movies).toEqual(MOCK_MOVIES)
    expect(preloadedState.search.status).toEqual('success')
  })
})
