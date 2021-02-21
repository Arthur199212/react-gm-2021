import React, { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { TextareaBox } from '@app/components'
import './TextareaFormField.scss'

type TextareaFormFieldProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  type?: string
  value?: string | number
}

export const TextareaFormField = ({ label, ...rest }: TextareaFormFieldProps) => (
  <div className='app-textarea-form-field'>
    <label className='app-textarea-form-field-label'>{label}</label>
    <TextareaBox {...rest} />
  </div>
)
