import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const Button = (props: ButtonProps) => <a className='app-button' {...props} />
