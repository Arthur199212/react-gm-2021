import React, { useCallback, useRef, useState } from 'react'
import {
  Card,
  CardMedia,
  DeleteModalContent,
  Dropdown,
  DropdownItem,
  Form,
  FormContent,
  Modal,
  SmallModal,
  ShowMoreButton
} from '@app/components'
import { useClickOutside } from '@app/hooks'
import './MovieCard.scss'
import { Link } from 'react-router-dom'

type MovieCardProps = {
  description: string
  id: string
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

  const handleDropdownClose = useCallback(() => setDropdownOpen(false), [])

  useClickOutside(dropdownRef, handleDropdownClose, dropdownOpen)

  const handleClick = (str: string) => {
    setDropdownOpen(false)

    if (str === 'edit') {
      setEditModalOpen(true)
      return
    }

    setDeleteModalOpen(true)
  }

  return (
    <>
      <Card>
        <div className='image-container'>
          <Link className='card-media-link' to={`/movie/${id}`}>
            <CardMedia image={image} title={title} />
          </Link>
          <ShowMoreButton open={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)} />
          <Dropdown elRef={dropdownRef} open={dropdownOpen}>
            <DropdownItem onClick={() => handleClick('edit')}>Edit</DropdownItem>
            <DropdownItem onClick={() => handleClick('delete')}>Delete</DropdownItem>
          </Dropdown>
        </div>
        <Link to={`/movie/${id}`}>
          <h2 className='title text-truncate'>{title}</h2>
        </Link>
        <div className='description text-truncate'>{description}</div>
        <div className='release text-truncate'>
          {release}
          <i className='rating-icon fas fa-star'></i>
          <span className='rating-value'>{rating}/10</span>
        </div>
      </Card>
      <Modal open={editModalOpen}>
        <Form content={FormContent.EDIT} onClose={() => setEditModalOpen(false)} />
      </Modal>
      <SmallModal open={deleteModalOpen}>
        <DeleteModalContent onClose={() => setDeleteModalOpen(false)} />
      </SmallModal>
    </>
  )
}
