import React, { ReactNode, RefObject } from 'react'
import classNames from 'classnames'
import { useScrollLock } from '@app/hooks'
import { SmallModalTestIds } from './SmallModal.contants'
import './SmallModal.scss'

type SmallModalProps = {
  children?: ReactNode
  elRef?: RefObject<HTMLDivElement> | null
  open: boolean
  scrollable?: boolean
}

export const SmallModal = ({
  children,
  elRef = null,
  open,
  scrollable = true
}: SmallModalProps) => {
  useScrollLock(elRef, open, scrollable)

  return (
    <div
      className={classNames('app-small-modal-container', { open })}
      data-testid={SmallModalTestIds.CONTAINER}
    >
      <div className='app-small-modal' ref={elRef}>
        {children}
      </div>
    </div>
  )
}
