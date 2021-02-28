import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import './Card.scss'

type CardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Card = (props: CardProps) => <div className='app-card' {...props}></div>
