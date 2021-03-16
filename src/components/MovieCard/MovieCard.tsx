import Link from 'next/link'
import React, { useRef, useState } from 'react'
import {
  Card,
  CardMedia,
  Dropdown,
  DropdownItem,
  Modal,
  SmallModal,
  ShowMoreButton
} from '@app/components'
import { DeleteMovieForm, EditMovieForm } from '@app/features'
import { useClickOutside } from '@app/hooks'
import { MovieCardTestIds } from './MovieCard.constants'

enum MovieCardDropdownType {
  DELETE = 'delete',
  EDIT = 'edit'
}

export type MovieCardProps = {
  description: string
  id: number
  image: string
  rating: number
  release: string
  title: string
}

export const MovieCard = ({ description, id, image, rating, release, title }: MovieCardProps) => {
  const dropdownRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleDropdownClose = () => setDropdownOpen(false)

  useClickOutside(dropdownRef, handleDropdownClose, dropdownOpen)

  const handleClick = (str: string) => {
    setDropdownOpen(false)

    if (str === MovieCardDropdownType.EDIT) {
      setEditModalOpen(true)
      return
    }

    setDeleteModalOpen(true)
  }

  return (
    <>
      <Card>
        <div className='image-container'>
          <Link href={`/movie/${id}`}>
            <a className='card-media-link'>
              <CardMedia image={image} title={title} />
            </a>
          </Link>
          <ShowMoreButton open={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)} />
          <Dropdown data-testid={MovieCardTestIds.DROPDOWN} elRef={dropdownRef} open={dropdownOpen}>
            <DropdownItem onClick={() => handleClick(MovieCardDropdownType.EDIT)}>
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => handleClick(MovieCardDropdownType.DELETE)}>
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
        <Link href={`/movie/${id}`}>
          <h2 className='title text-truncate'>{title}</h2>
        </Link>
        <div className='description text-truncate'>{description}</div>
        <div className='release text-truncate'>
          {release}
          <i className='rating-icon fas fa-star'></i>
          <span className='rating-value'>{rating || 0}/10</span>
        </div>
      </Card>
      <Modal open={editModalOpen}>
        <EditMovieForm
          movieId={String(id)}
          onClose={() => setEditModalOpen(false)}
          open={editModalOpen}
        />
      </Modal>
      <SmallModal data-testid={MovieCardTestIds.SMALL_MODAL} open={deleteModalOpen}>
        <DeleteMovieForm
          movieId={String(id)}
          onClose={() => setDeleteModalOpen(false)}
          open={deleteModalOpen}
        />
      </SmallModal>
    </>
  )
}
