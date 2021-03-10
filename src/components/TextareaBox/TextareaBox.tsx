import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'
import './TextareaBox.scss'

export type TextareaBoxProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  noResize?: boolean
}

export const TextareaBox = ({ noResize, ...rest }: TextareaBoxProps) => (
  <textarea
    className={classNames('app-textarea', { 'no-resize': noResize })}
    autoComplete='off'
    rows={4}
    placeholder='TextareaBox'
    {...rest}
  />
)
