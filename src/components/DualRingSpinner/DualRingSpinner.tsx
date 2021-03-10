import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import './DualRingSpinner.scss'

type DualRingSpinnerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const DualRingSpinner = (props: DualRingSpinnerProps) => (
  <div className='app-dual-ring-spinner' {...props}></div>
)
