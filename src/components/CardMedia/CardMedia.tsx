import React, { DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState } from 'react'

type CardMediaProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  image: string
  title: string
}

export const CardMedia = ({ image, title, ...rest }: CardMediaProps) => {
  const [imgError, setImgError] = useState<boolean>(false)

  useEffect(() => {
    setImgError(false)
  }, [image])

  if (imgError) return <div className='app-card-media img-error'>Image Not Found</div>

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
