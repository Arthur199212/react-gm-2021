import React, { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react'
import classNames from 'classnames'
import './Dropdown.scss'

type DropdownProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  elRef: RefObject<HTMLUListElement>
  open: boolean
}

export const Dropdown = ({ elRef, open, ...rest }: DropdownProps) => (
  <ul className={classNames('app-dropdown', { open })} ref={elRef} {...rest} />
)
