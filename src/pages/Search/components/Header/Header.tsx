import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormContent, Modal } from '@app/components'
import { RoutePaths } from '@app/routes'
import { HeaderTestIds } from './Header.constants'
import './Header.scss'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <header className='header'>
      <div className='header-container container'>
        <Link to={RoutePaths.ROOT}>
          <span className='title'>MovieSearchApp</span>
        </Link>
        <Button data-testid={HeaderTestIds.BUTTON} onClick={handleClick}>
          ADD MOVIE
        </Button>
        <Modal open={isOpen}>
          <Form content={FormContent.CREATE} onClose={handleClose} />
        </Modal>
      </div>
    </header>
  )
}
