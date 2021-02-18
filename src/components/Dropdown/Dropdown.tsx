import React, { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react'
import classNames from 'classnames'
import { DropdownTestIds } from './Dropdown.constants'
import './Dropdown.scss'

type DropdownProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  elRef: RefObject<HTMLUListElement>
  open: boolean
}

export const Dropdown = ({ elRef, open, ...rest }: DropdownProps) => (
  <ul
    data-testid={DropdownTestIds.DROPDOWN}
    className={classNames('app-dropdown', { open })}
    ref={elRef}
    {...rest}
  />
)
