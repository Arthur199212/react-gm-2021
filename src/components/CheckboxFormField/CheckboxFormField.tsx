import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type CheckboxFormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
}

export const CheckboxFormField = ({ label, ...rest }: CheckboxFormFieldProps) => (
  <div className='app-checkbox-form-field'>
    <label className='label' htmlFor={label}>
      {label}
      <input aria-label={label} className='checkbox' type='checkbox' name={label} {...rest} />
      <span className='checkmark'></span>
    </label>
  </div>
)
