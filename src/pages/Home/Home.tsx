import React, { KeyboardEvent, useState } from 'react'
import { Button, Footer, InputBox } from '@app/components'
import { Filters, Header, SearchResults, SORT_BY_OPTIONS, TABS } from './components'
import './Home.scss'

export const Home = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>(TABS[0])
  const [sortBy, setSortBy] = useState<string>(SORT_BY_OPTIONS[0])

  const handleSubmit = () => {
    console.log(search.trim())
    setSearch('')
  }

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key !== 'Enter') return

    handleSubmit()
  }

  return (
    <>
      <div className='app-home-page content'>
        <Header />
        <main className='main'>
          <div className='container'>
            <div className='search-header'>
              <h1 className='title'>FIND YOUR MOVIE</h1>
            </div>
          </div>
          <div className='container'>
            <div className='search-container'>
              <InputBox
                placeholder='What do you want to watch?'
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={handleSubmit}>SEARCH</Button>
            </div>
            <Filters
              filter={filter}
              onFilterSelect={setFilter}
              onSortBySelect={setSortBy}
              sortBy={sortBy}
            />
            <SearchResults />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
