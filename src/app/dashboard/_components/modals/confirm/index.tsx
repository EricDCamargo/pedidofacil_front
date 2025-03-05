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
      <form className={styles.modalContainer} action={onConfirm}>
        <div className={styles.modalHeader}>
          <h2>{modalText.title}</h2>
        </div>

        <div className={styles.modalBody}>{modalText.message}</div>
        <div className={styles.modalFooter}>
          <Button name="Cancelar" type="button" onClick={onCancel} />

          <Button name="Confirmar" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default ConfirmModal
