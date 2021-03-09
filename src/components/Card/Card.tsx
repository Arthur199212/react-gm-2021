import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

type CardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Card = (props: CardProps) => <div className='app-card' {...props}></div>
