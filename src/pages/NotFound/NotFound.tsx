import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.scss'

export const NotFound = () => (
  <div className='app-not-found-page'>
    Page Not Found
    <Link className='link' to='/'>
      Go Home
    </Link>
  </div>
)
