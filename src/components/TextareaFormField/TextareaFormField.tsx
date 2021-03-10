import React from 'react'
import { TextareaBox, TextareaBoxProps } from '@app/components'
import './TextareaFormField.scss'

type TextareaFormFieldProps = TextareaBoxProps & {
  label: string
}

export const TextareaFormField = ({ label, ...rest }: TextareaFormFieldProps) => (
  <div className='app-textarea-form-field'>
    <label className='app-textarea-form-field-label'>{label}</label>
    <TextareaBox {...rest} />
  </div>
)
