import React, { DetailedHTMLProps, LiHTMLAttributes } from 'react'
import './DropdownItem.scss'

type DropdownItemProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

const DropdownItem = ({ ...props }: DropdownItemProps) => <li className='button' {...props} />

export default DropdownItem
