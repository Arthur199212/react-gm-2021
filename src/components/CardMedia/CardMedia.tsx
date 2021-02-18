import React, { DetailedHTMLProps, ImgHTMLAttributes, useState } from 'react'
import './CardMedia.scss'

type CardMediaProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  image: string
  title: string
}

export const CardMedia = ({ image, title, ...rest }: CardMediaProps) => {
  const [imgError, setImgError] = useState<boolean>(false)

  if (imgError) return <div className='image img-error'>Image Not Found</div>

  return (
    <img
      className='app-card-media'
      src={image}
      alt={title}
      draggable='false'
      onError={() => setImgError(true)}
      {...rest}
    />
  )
}
