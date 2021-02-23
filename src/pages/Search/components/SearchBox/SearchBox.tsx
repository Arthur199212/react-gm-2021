import React, { KeyboardEvent } from 'react'
import { Button, InputBox } from '@app/components'
import './SearchBox.scss'

type SearchBoxProps = {
  onSearch: () => void
  query: string
  setQuery: (query: string) => void
}

export const SearchBox = ({ query, onSearch, setQuery }: SearchBoxProps) => {
  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== 'Enter') return

    onSearch()
  }

  return (
    <div className='search-box-container container'>
      <div className='search-header'>
        <h1 className='title'>FIND YOUR MOVIE</h1>
      </div>
      <div className='search-container'>
        <InputBox
          placeholder='What do you want to watch?'
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={onSearch}>SEARCH</Button>
      </div>
    </div>
  )
}
