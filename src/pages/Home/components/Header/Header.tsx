import React, { useState } from 'react'
import { Button, Modal } from '@app/components'
import { Form, FormContent } from '@app/pages/Home/components'
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
        <a className='title'>MovieSearchApp</a>
        <Button onClick={handleClick}>ADD MOVIE</Button>
        <Modal open={isOpen}>
          <Form content={FormContent.CREATE} onClose={handleClose} />
        </Modal>
      </div>
    </header>
  )
}
