import React from 'react'
import { Button } from '@app/components'
import './Header.scss'

const Header = () => (
  <header className='header'>
    <div className='header-container container'>
      <a className='title'>MovieSearchApp</a>
      <Button>ADD MOVIE</Button>
    </div>
  </header>
)

export default Header
