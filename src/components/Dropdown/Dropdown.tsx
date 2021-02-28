import React, { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react'
import { DropdownTestIds } from './Dropdown.constants'
import './Dropdown.scss'

type DropdownProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  elRef: RefObject<HTMLUListElement>
  open: boolean
}

const Dropdown = ({ elRef, open, ...rest }: DropdownProps) => (
  <ul
    data-testid={DropdownTestIds.dropdown}
    className={`dropdown ${open ? 'open' : ''}`}
    ref={elRef}
    {...rest}
  />
)

export default Dropdown
