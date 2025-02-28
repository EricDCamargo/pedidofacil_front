import React, { ReactNode } from 'react'
import styles from './styles.module.css'
import { Button } from '../../../../_components/button'

interface ConfirmModalProps {
  isOpen: boolean
  modalText: { title: string; message: ReactNode | string }
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  modalText,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{modalText.title}</h2>
        </div>

        <div className={styles.modalBody}>{modalText.message}</div>
        <div className={styles.modalFooter}>
          <Button name="Cancelar" type="button" onClick={onCancel} />

          <Button name="Confirmar" type="submit" onClick={onConfirm} />
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
