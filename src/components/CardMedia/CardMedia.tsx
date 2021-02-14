import React, { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react'
import './CardMedia.scss'

type CardMediaProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  imageUrl: string
  title: string
}

const CardMedia = ({ imageUrl, title, ...rest }: CardMediaProps) => {
  const [imgError, setImgError] = useState<boolean>(false)

  if (imgError) return <div className='image img-error'>Image Not Found</div>

  return (
    <img
      className='card-media'
      src={imageUrl}
      alt={title}
      draggable='false'
      onError={() => setImgError(true)}
      {...rest}
    />
  )
}

export default CardMedia
