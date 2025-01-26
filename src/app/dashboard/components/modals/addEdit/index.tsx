import { ReactNode } from 'react'
import styled from './modal.module.css'
import { Pencil, X } from 'lucide-react'

interface AddEditModalProps {
  isOpen: boolean
  children: ReactNode
  modalTitle: string
  onCancel: () => void
  enableEdition?: VoidFunction
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  children,
  isOpen,
  modalTitle,
  onCancel,
  enableEdition
}: AddEditModalProps) => {
  if (isOpen) {
    return (
      <div className={styled.backgroundModal}>
        <div className={styled.content}>
          <div className={styled.header}>
            <h1>{modalTitle}</h1>
            <div className={styled.icons}>
              {enableEdition && (
                <button className={styled.icon} onClick={enableEdition}>
                  <Pencil />
                </button>
              )}
              <button className={styled.icon} onClick={onCancel}>
                <X size={20} />
              </button>
            </div>
          </div>
          <div className={styled.body}>{children}</div>
        </div>
      </div>
    )
  }
  return null
}
export default AddEditModal
