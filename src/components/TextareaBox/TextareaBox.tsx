import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'
import './TextareaBox.scss'

export type TextareaBoxProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  error?: boolean
  noResize?: boolean
}

export const TextareaBox = ({ error, noResize, ...rest }: TextareaBoxProps) => (
  <textarea
    className={classNames('app-textarea', { 'no-resize': noResize }, { error })}
    autoComplete='off'
    rows={4}
    placeholder='TextareaBox'
    {...rest}
  />
)
