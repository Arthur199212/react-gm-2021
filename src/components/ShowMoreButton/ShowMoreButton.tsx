import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ShowMoreButtonTestIds } from './ShowMoreButton.constants'

type ShowMoreButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  open?: boolean
}

export const ShowMoreButton = ({ open, ...rest }: ShowMoreButtonProps) => (
  <div data-testid={ShowMoreButtonTestIds.BUTTON} className='app-show-more-button' {...rest}>
    <i className='fas fa-ellipsis-v'></i>
  </div>
)
