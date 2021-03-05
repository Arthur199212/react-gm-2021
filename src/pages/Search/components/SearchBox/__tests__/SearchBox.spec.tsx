import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from '@app/pages/Search/components'

describe('SearchBox Component', () => {
  const onSearch = jest.fn()
  const queryMock = 'query'
  const setQuery = jest.fn()
  const setup = () =>
    render(<SearchBox onSearch={onSearch} query={queryMock} setQuery={setQuery} />)

  beforeEach(() => {
    onSearch.mockClear()
    setQuery.mockClear()
  })

  it('should render properly', () => {
    setup()

    expect(screen.getByText(/find your movie/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('What do you want to watch?')).toBeInTheDocument()
    expect(screen.getByText(/search/i)).toBeInTheDocument()
  })

  it('search input should work properly', () => {
    setup()
    const input = screen.getByPlaceholderText('What do you want to watch?') as HTMLInputElement

    userEvent.type(input, queryMock)
    expect(input.value).toBe(queryMock)
    expect(setQuery).toBeCalled()

    fireEvent.keyDown(input, { key: 'Esc' })
    expect(input.value).toBe(queryMock)

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSearch).toBeCalledTimes(1)
  })
})
