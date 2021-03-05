import React from 'react'
import { Link } from 'react-router-dom'
import { RoutePaths } from '@app/routes'
import './Header.scss'

export const Header = () => (
  <header className='header'>
    <div className='header-container container'>
      <Link to={RoutePaths.SEARCH}>
        <span className='title'>MovieSearchApp</span>
      </Link>
      <Link to={RoutePaths.SEARCH}>
        <i className='search-icon fas fa-search'></i>
      </Link>
    </div>
  </header>
)
