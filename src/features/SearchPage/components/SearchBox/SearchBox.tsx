import { useRouter } from 'next/router'
import React, { KeyboardEvent } from 'react'
import { Button, InputBox } from '@app/components'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectQuery, setQuery, setSearchQuery } from '@app/features/SearchPage/store'

export const SearchBox = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)

  const handlePerformSearch = () => {
    router.push(`/search/${encodeURIComponent(query.trim())}`)
    dispatch(setSearchQuery(query))
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
