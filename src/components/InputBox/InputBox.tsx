import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import './InputBox.scss'

type InputBoxProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  error?: boolean
}

export const InputBox = ({ error, ...rest }: InputBoxProps) => (
  <input
    className={classNames('app-input-box', { error })}
    autoComplete='off'
    type='text'
    {...rest}
  />
)
