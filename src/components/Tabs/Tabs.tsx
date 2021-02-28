import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import './Tabs.scss'

type TabsProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  children: ReactNode
}

const Tabs = ({ ...props }: TabsProps) => <ul className='tabs' {...props} />

export default Tabs
