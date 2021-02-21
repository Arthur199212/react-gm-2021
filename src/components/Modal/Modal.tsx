import React, { ReactNode, RefObject, useEffect } from 'react'
import classNames from 'classnames'
import { ModalTestIds } from './Modal.contants'
import './Modal.scss'

type ModalProps = {
  children?: ReactNode
  elRef?: RefObject<HTMLDivElement> | null
  open: boolean
  disableScroll?: boolean
}

export const Modal = ({ children, disableScroll = true, elRef = null, open }: ModalProps) => {
  useEffect(() => {
    if (!disableScroll) return

    if (open) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
    }
  }, [disableScroll, open, elRef])

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
