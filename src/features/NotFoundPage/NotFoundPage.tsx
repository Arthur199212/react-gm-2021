import Link from 'next/link'
import React from 'react'

export const NotFoundPage = () => (
  <div className='app-not-found-page'>
    Page Not Found
    <Link href='/search'>
      <a className='link'>Go Home</a>
    </Link>
  </div>
)
