import React, { MouseEvent, ReactNode } from 'react'
import { InputBox, FormFieldProps } from '@app/components'
import './MultipleSelectionFormField.scss'

type MultipleSelectionFormFieldProps = FormFieldProps & {
  children: ReactNode
  onOpen: (event: MouseEvent) => void
}

export const MultipleSelectionFormField = ({
  children,
  label,
  onOpen,
  ...rest
}: MultipleSelectionFormFieldProps) => (
  <div className='app-multiple-selection-form-field'>
    <label className='app-multiple-selection-form-field-label'>{label}</label>
    <InputBox className='app-multiple-selection-form-input-box' onClick={onOpen} {...rest} />
    {children}
  </div>
)
