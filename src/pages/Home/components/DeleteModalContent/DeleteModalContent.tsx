import React from 'react'
import { Button } from '@app/components'
import './DeleteModalContent.scss'

type DeleteModalContentProps = {
  onClose: () => void
}

export const DeleteModalContent = ({ onClose }: DeleteModalContentProps) => (
  <>
    <div className='delete-modal-container'>
      <h5 className='delete-modal-header'>DELETE MOVIE</h5>
      <i className='fas fa-times close-icon' onClick={onClose}></i>
      <div className='delete-modal-text'>Are you sure you want to delete this movie?</div>
    </div>
    <div className='delete-modal-actions-container'>
      <Button onClick={onClose}>CONFIRM</Button>
    </div>
  </>
)
