import React, { DetailedHTMLProps, LiHTMLAttributes } from 'react'
import classNames from 'classnames'
import './TabItem.scss'

type TabsProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  active: boolean
}

export const TabItem = ({ active, ...rest }: TabsProps) => (
  <li className={classNames('app-tab', { active })} {...rest} />
)
