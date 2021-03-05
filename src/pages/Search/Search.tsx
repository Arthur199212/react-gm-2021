import React, { useState } from 'react'
import { Filters, Footer, SearchResults, SORT_BY_OPTIONS, TABS } from '@app/components'
import { Header, SearchBox } from './components'
import './Search.scss'

export const Search = () => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string>(TABS[0])
  const [sortBy, setSortBy] = useState<string>(SORT_BY_OPTIONS[0])

  const handleSearch = () => {
    console.log(query.trim())
    setQuery('')
  }

  return (
    <>
      <div className='app-search-page content'>
        <Header />
        <main className='main'>
          <SearchBox query={query} onSearch={handleSearch} setQuery={setQuery} />
          <div className='container'>
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
