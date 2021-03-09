import React, { DetailedHTMLProps, LiHTMLAttributes } from 'react'
import { DropdownItemTestIds } from './DropdownItem.constants'

type DropdownItemProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

export const DropdownItem = (props: DropdownItemProps) => (
  <li data-testid={DropdownItemTestIds.DROPDOWN_ITEM} className='app-dropdown-item' {...props} />
)
