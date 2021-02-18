import React, { ReactNode, RefObject, useEffect } from 'react'
import classNames from 'classnames'
import './SmallModal.scss'

type SmallModalProps = {
  children?: ReactNode
  elRef?: RefObject<HTMLDivElement> | null
  open: boolean
  disableScroll?: boolean
}

export const SmallModal = ({
  children,
  disableScroll = true,
  elRef = null,
  open
}: SmallModalProps) => {
  useEffect(() => {
    if (!disableScroll) return

    if (open) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
    }
  }, [disableScroll, open, elRef])

  return (
    <div className={classNames('app-small-modal-container', { open })}>
      <div className='app-small-modal' ref={elRef}>
        {children}
      </div>
    </div>
  )
}
