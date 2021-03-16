import React from 'react'
import { Filters, Footer, SearchResults } from '@app/components'
import { Header, MovieDetails } from './components'

export const MoviePage = () => (
  <>
    <div className='app-movie-page content'>
      <Header />
      <main className='main'>
        <MovieDetails />
        <div className='container'>
          <Filters />
          <SearchResults />
        </div>
      </main>
    </div>
    <Footer />
  </>
)
