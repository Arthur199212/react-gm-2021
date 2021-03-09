import React, { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react'
import classNames from 'classnames'
import { useScrollLock } from '@app/hooks'

type SmallModalProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  elRef?: RefObject<HTMLDivElement> | null
  open: boolean
  scrollable?: boolean
}

export const SmallModal = ({
  children,
  elRef = null,
  open,
  scrollable = true,
  ...rest
}: SmallModalProps) => {
  useScrollLock(elRef, open, scrollable)

  return (
    <div className={classNames('app-small-modal-container', { open })} {...rest}>
      <div className='app-small-modal' ref={elRef}>
        {children}
      </div>
    </div>
  )
}
