import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

type DualRingSpinnerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const DualRingSpinner = (props: DualRingSpinnerProps) => (
  <div className='app-dual-ring-spinner' {...props}></div>
)
