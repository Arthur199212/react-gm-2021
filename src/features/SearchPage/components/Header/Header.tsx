import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Modal } from '@app/components'
import { AddMovieForm } from '@app/features'
import { HeaderTestIds } from './Header.constants'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='header'>
      <div className='header-container container'>
        <Link href='/search'>
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
