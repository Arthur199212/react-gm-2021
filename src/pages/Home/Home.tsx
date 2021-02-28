import React from 'react'
import { Footer, Header } from '@app/components'
import { Filters, SearchResults } from './components'
import './Home.scss'

const Home = () => {
  return (
    <>
      <div className='home-page content'>
        <Header />
        <main className='main'>
          <div className='container'>
            <div className='search-header'>
              <h1 className='title'>FIND YOUR MOVIE</h1>
            </div>
          </div>
          <div className='container'>
            <div className='search-container'>
              <input className='search-box' type='text' placeholder='What do you want to watch?' />
              <a className='button'>SEARCH</a>
            </div>
            <Filters />
            <SearchResults />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Home
