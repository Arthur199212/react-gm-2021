import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AddMovieForm, Button, Modal } from '@app/components'
import { RoutePath } from '@app/routes'
import { HeaderTestIds } from './Header.constants'
import './Header.scss'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='header'>
      <div className='header-container container'>
        <Link to={RoutePath.ROOT}>
          <span className='title'>MovieSearchApp</span>
        </Link>
        <Button data-testid={HeaderTestIds.BUTTON} onClick={() => setIsOpen(true)}>
          ADD MOVIE
        </Button>
        <Modal open={isOpen}>
          <AddMovieForm onClose={() => setIsOpen(false)} open={isOpen} />
        </Modal>
      </div>
    </header>
  )
}
