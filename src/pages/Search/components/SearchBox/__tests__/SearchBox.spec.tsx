import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SearchBox } from '@app/pages/Search/components'
import { render } from '@app/tests/testing-utils'

describe('SearchBox Component', () => {
  const queryMock = 'query'
  const setup = () => render(<SearchBox />)

  it('search input should work properly', () => {
    setup()
    const input = screen.getByPlaceholderText('What do you want to watch?') as HTMLInputElement

    userEvent.type(input, queryMock)
    expect(input.value).toBe(queryMock)

    fireEvent.keyDown(input, { key: 'Esc' })
    expect(input.value).toBe(queryMock)

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input.value).toBe('')
  })
})
