import React from 'react'
import { Filters, Footer, SearchResults } from '@app/components'
import { Header, SearchBox } from './components'
import './Search.scss'

export const Search = () => (
  <>
    <div className='app-search-page content'>
      <Header />
      <main className='main'>
        <SearchBox />
        <div className='container'>
          <Filters />
          <SearchResults />
        </div>
      </main>
    </div>
    <Footer />
  </>
)
