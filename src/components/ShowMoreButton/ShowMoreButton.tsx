import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ShowMoreButtonTestIds } from './ShowMoreButton.constants'
import './ShowMoreButton.scss'

type ShowMoreButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  open?: boolean
}

const ShowMoreButton = ({ open, ...rest }: ShowMoreButtonProps) => (
  <div
    data-testid={ShowMoreButtonTestIds.button}
    className={`show-more-btn ${open ? 'open' : 'close'}`}
    {...rest}
  >
    <i className='fas fa-ellipsis-v'></i>
  </div>
)

export default ShowMoreButton
