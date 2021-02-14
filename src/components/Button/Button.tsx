import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
import './Button.scss'

type ButtonProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

const Button = ({ ...props }: ButtonProps) => <a className='button' {...props} />

export default Button
