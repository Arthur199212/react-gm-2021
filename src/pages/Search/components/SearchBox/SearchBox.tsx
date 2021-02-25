import React, { KeyboardEvent, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, InputBox } from '@app/components'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import { selectSearchQuery, setQuery, fetchMoviesThunk } from '@app/pages/Search/store'
import './SearchBox.scss'

export const SearchBox = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const query = useAppSelector(selectSearchQuery)
  const { query: queryParam } = useParams<{ query: string }>()

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== 'Enter') return
    history.push(`/search/${encodeURIComponent(query.trim())}`)
  }

  useEffect(() => {
    if (queryParam) {
      dispatch(fetchMoviesThunk(queryParam))
    }
  }, [dispatch, queryParam])

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
        <Button onClick={() => history.push(`/search/${encodeURIComponent(query.trim())}`)}>
          SEARCH
        </Button>
      </div>
    </div>
  )
}
