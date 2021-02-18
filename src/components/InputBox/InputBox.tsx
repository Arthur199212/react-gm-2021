import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import './InputBox.scss'

type InputBoxProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputBox = (props: InputBoxProps) => (
  <input className='app-input-box' autoComplete='off' type='text' {...props} />
)
