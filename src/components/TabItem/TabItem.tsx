import React, { DetailedHTMLProps, LiHTMLAttributes, ReactNode } from 'react'
import './TabItem.scss'

type TabsProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  children: ReactNode
}

const TabItem = ({ ...props }: TabsProps) => <li className='tab' {...props} />

export default TabItem
