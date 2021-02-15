import React, { DetailedHTMLProps, LiHTMLAttributes } from 'react'
import { DropdownItemTestIds } from './DropdownItem.constants'
import './DropdownItem.scss'

type DropdownItemProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

const DropdownItem = ({ ...props }: DropdownItemProps) => (
  <li data-testid={DropdownItemTestIds.dropdownItem} className='button' {...props} />
)

export default DropdownItem
