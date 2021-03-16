import React, { ReactNode, RefObject } from 'react'
import classNames from 'classnames'
import { useScrollLock } from '@app/hooks'
import { ModalTestIds } from './Modal.contants'

type ModalProps = {
  children?: ReactNode
  elRef?: RefObject<HTMLDivElement> | null
  open: boolean
  scrollable?: boolean
}

export const Modal = ({ children, scrollable = false, elRef = null, open }: ModalProps) => {
  useScrollLock(elRef, open, scrollable)

  return (
    <div
      className={classNames('app-modal-container', { open })}
      data-testid={ModalTestIds.CONTAINER}
    >
      <div className='app-modal' ref={elRef}>
        {children}
      </div>
    </div>
  )
}
