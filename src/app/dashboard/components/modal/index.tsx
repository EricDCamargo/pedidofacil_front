import { ReactNode } from 'react'
import styled from './modal.module.css'
import { Button } from '../button'
import { Pencil, X } from 'lucide-react'

interface AddEditModalProps {
  isOpen: boolean
  children: ReactNode
  modalTitle: string
  onCancel: () => void
  onSave?: () => void
  buttons?: boolean
  enableEdition?: VoidFunction
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  children,
  isOpen,
  modalTitle,
  buttons,
  onCancel,
  onSave,
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
                <div className={styled.closeConteiner} onClick={enableEdition}>
                  <Pencil />
                </div>
              )}
              <div className={styled.closeConteiner} onClick={onCancel}>
                <X size={20} />
              </div>
            </div>
          </div>
          <div className={styled.body}>{children}</div>
          {buttons && (
            <div className={styled.modalFooter}>
              <Button onClick={onCancel} name="Cancelar" />
              <Button onClick={onSave!} name="Salvar" />
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}
export default AddEditModal
