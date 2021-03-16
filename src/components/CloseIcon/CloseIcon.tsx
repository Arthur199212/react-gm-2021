import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import classNames from 'classnames'

type CloseIconProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  topRight?: boolean
}

export const CloseIcon = ({ topRight, ...rest }: CloseIconProps) => (
  <i className={classNames('app-close-icon', 'fas fa-times', { topRight })} {...rest}></i>
)
