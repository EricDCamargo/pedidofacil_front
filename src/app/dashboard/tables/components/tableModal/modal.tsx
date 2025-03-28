import { useContext } from 'react'
import styles from './modal.module.css'
import { TableContext } from '@/contexts/table'
import AddEditModal from '@/app/dashboard/_components/modals/addEdit'
import Dropdown from '@/app/dashboard/_components/dropDown'
import { TableStatus } from '@/utils/recordStatus'
import { Button } from '@/app/_components/button'

const TableModal: React.FC = () => {
  const {
    currentTable,
    isTableModalOpen,
    newTable,
    onEdition,
    setConfirmModalOpen,
    setTableModalOpen,
    setOnEdition,
    setcurrentTable,
    handleTableSubmit
  } = useContext(TableContext)

  const handleClose = () => {
    setTableModalOpen(false)
    setcurrentTable(newTable)
    setOnEdition(true)
  }
  const handleSubmit = async (formData: FormData) => {
    const number = formData.get('number') as unknown as number
    const status = formData.get('status') as TableStatus

    await handleTableSubmit({ status, number })
  }

  const handleEditi = () => {
    setOnEdition(!onEdition)
  }

  const handleDelete = () => {
    setConfirmModalOpen(true)
  }

  return (
    <AddEditModal
      isOpen={isTableModalOpen}
      modalTitle={
        currentTable.id
          ? `Editar Mesa ${currentTable.number}`
          : 'Adicionar Mesa'
      }
      onCancel={handleClose}
      enableEdition={currentTable.id ? handleEditi : undefined}
      onDelete={currentTable.id ? handleDelete: undefined}
    >
      <section className={styles.formulary}>
        <form className={styles.form} action={handleSubmit}>
          <div className={styles.inputsConteiner}>
            <div className={styles.inputRow}>
              <input
                type="number"
                required
                name="number"
                disabled={onEdition}
                defaultValue={currentTable.number}
                placeholder="Digite o numero da mesa..."
                className={styles.input}
              />
              {currentTable.id && (
                <Dropdown
                  disabled={onEdition}
                  defaultValue={currentTable.status}
                  name="status"
                  options={[
                    { label: 'Disponvel', value: TableStatus.AVAILABLE },
                    { label: 'Ocupada', value: TableStatus.OCCUPIED }
                  ]}
                  width="100%"
                />
              )}
            </div>
          </div>

          {!onEdition && (
            <div className={styles.buttonsContainer}>
              <Button onClick={handleClose} name="Cancelar" type="button" />

              <Button name="Salvar" type="submit" />
            </div>
          )}
        </form>
      </section>
    </AddEditModal>
  )
}
export default TableModal
