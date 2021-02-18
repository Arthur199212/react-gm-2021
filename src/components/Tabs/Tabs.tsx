import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import './Tabs.scss'

type TabsProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  children: ReactNode
}

export const Tabs = (props: TabsProps) => <ul className='app-tabs' {...props} />
