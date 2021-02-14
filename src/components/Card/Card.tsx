import React, { useRef, useState } from 'react'
import { CardMedia, Dropdown, DropdownItem, ShowMoreButton } from '@app/components'
import { useClickOutside } from '@app/hooks'
import './Card.scss'

type CardProps = {
  description: string
  image: string
  rating: number
  release: string
  title: string
}

const Card = ({ description, image, rating, release, title }: CardProps) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = () => setIsOpen(!isOpen)

  useClickOutside(dropdownRef, handleClickOutside, isOpen)

  const handleClick = (str: string) => {
    setIsOpen(false)
  }

  return (
    <div className='card'>
      <div className='image-container'>
        <CardMedia imageUrl={image} title={title} />
        <ShowMoreButton open={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <Dropdown elRef={dropdownRef} open={isOpen}>
          <DropdownItem onClick={() => handleClick('edit')}>Edit</DropdownItem>
          <DropdownItem onClick={() => handleClick('delete')}>Delete</DropdownItem>
        </Dropdown>
      </div>
      <h2 className='title text-truncate'>{title}</h2>
      <div className='description text-truncate'>{description}</div>
      <div className='release text-truncate'>
        {release}
        <i className='rating-icon fas fa-star'></i>
        <span className='rating-value'>{rating}/10</span>
      </div>
    </div>
  )
}

export default Card
