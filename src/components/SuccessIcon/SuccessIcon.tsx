import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

type SuccessIconProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

export const SuccessIcon = (props: SuccessIconProps) => (
  <i className='app-success-icon fas fa-check' {...props}></i>
)
