import Link from 'next/link'
import React from 'react'

export const Header = () => (
  <header className='header'>
    <div className='header-container container'>
      <Link href='/search'>
        <span className='title'>MovieSearchApp</span>
      </Link>
      <Link href='/search'>
        <i className='search-icon fas fa-search'></i>
      </Link>
    </div>
  </header>
)
