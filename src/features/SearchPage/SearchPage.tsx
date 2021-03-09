import React from 'react'
import { Filters, Footer, SearchResults } from '@app/components'
import { Header, SearchBox } from './components'

export const SearchPage = () => (
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
