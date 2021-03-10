import React from 'react'
import { SearchPage } from '@app/features'
import { render } from '@app/tests/testing-utils'
import { screen } from '@testing-library/react'
import { SearchResultsTestIds } from '@app/components'

describe('Search Page', () => {
  const query = { query: 'test' }

  it('should render properly', async () => {
    const { asFragment } = render(<SearchPage />, { query })

    await screen.findByTestId(SearchResultsTestIds.CONTAINER)

    expect(asFragment()).toMatchSnapshot()
  })
})
