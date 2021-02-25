import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, MovieForm, MovieFormContent, Modal } from '@app/components'
import { RoutePaths } from '@app/routes'
import { HeaderTestIds } from './Header.constants'
import './Header.scss'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='header'>
      <div className='header-container container'>
        <Link to={RoutePaths.ROOT}>
          <span className='title'>MovieSearchApp</span>
        </Link>
        <Button data-testid={HeaderTestIds.BUTTON} onClick={() => setIsOpen(true)}>
          ADD MOVIE
        </Button>
        <Modal open={isOpen}>
          <MovieForm
            content={MovieFormContent.CREATE}
            onClose={() => setIsOpen(false)}
            open={isOpen}
          />
        </Modal>
      </div>
    </header>
  )
}
