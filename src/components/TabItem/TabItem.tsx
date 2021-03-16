import React, { DetailedHTMLProps, LiHTMLAttributes } from 'react'
import classNames from 'classnames'

type TabsProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  active: boolean
}

export const TabItem = ({ active, ...rest }: TabsProps) => (
  <li className={classNames('app-tab', { active })} {...rest} />
)
