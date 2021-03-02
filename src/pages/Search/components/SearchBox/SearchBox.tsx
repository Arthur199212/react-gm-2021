import React, { KeyboardEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, InputBox } from '@app/components'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectSearchQuery, setQuery } from '@app/pages/Search/store'
import './SearchBox.scss'

export const SearchBox = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const query = useAppSelector(selectSearchQuery)

  const handlePerformSearch = () => {
    history.push(`/search/${encodeURIComponent(query.trim())}`)
    dispatch(setQuery(''))
  }

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== 'Enter') return
    handlePerformSearch()
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
          onChange={({ target: { value } }) => dispatch(setQuery(value))}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handlePerformSearch}>SEARCH</Button>
      </div>
    </div>
  )
}
