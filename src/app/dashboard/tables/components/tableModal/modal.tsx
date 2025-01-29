import { use } from 'react'
import styles from './modal.module.css'
import { toast } from 'sonner'
import moment from 'moment'
import { serviceConsumer } from '@/services/service.consumer'
import { useRouter } from 'next/navigation'
import { StatusCodes } from 'http-status-codes'
import { TableContext } from '@/providers/table'
import { TableStatus } from '@/types/table.type'
import AddEditModal from '@/app/dashboard/components/modals/addEdit'
import Dropdown from '@/app/dashboard/components/dropDown'

const TableModal: React.FC = () => {
  const router = useRouter()
  const {
    currentTable,
    isTableModalOpen,
    newTable,
    onEdition,
    setConfirmModalOpen,
    setTableModalOpen,
    setOnEdition,
    setcurrentTable
  } = use(TableContext)

  const handleClose = () => {
    setTableModalOpen(false)
    setcurrentTable(newTable)
    setOnEdition(true)
  }
  const handleSubmit = async (formData: FormData) => {
    const number = formData.get('number') as unknown as number
    const status = formData.get('status') as TableStatus

    const updateTable = async () => {
      try {
        const res = await serviceConsumer('').executePut(
          '/table/status',
          {},
          {
            table_id: currentTable.id,
            status
          }
        )
        if (res.isOk && res.status === StatusCodes.OK) {
          toast.success(res.message)
          setTableModalOpen(false)
          setcurrentTable(newTable)
          router.refresh()
        } else {
          toast.error(res.message)
          setOnEdition(true)
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao editar')
        setOnEdition(true)
      }
    }

    const createTable = async () => {
      try {
        const res = await serviceConsumer('').executePost('/table', {
          number: number as number
        })

        if (res.isOk && res.status === StatusCodes.CREATED) {
          toast.success(res.message)
          setTableModalOpen(false)
          setcurrentTable(newTable)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao cadastrar mesa!')
        setOnEdition(true)
      }
    }

    // DETERMINATE FORM ACTION
    if (currentTable.id) {
      await updateTable()
    } else {
      await createTable()
    }
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
      enableEdition={handleEditi}
      onDelete={handleDelete}
    >
      <section className={styles.formulary}>
        <form action={handleSubmit}>
          <div className={styles.inputsConteiner}>
            <div>
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

          <div className={styles.modalFooter}>
            <div className={styles.date}>
              {currentTable.created_at && currentTable.created_at && (
                <>
                  Criado em:
                  <p>
                    {moment(currentTable.created_at).format('DD/MM/YY HH:mm')}
                  </p>
                  <br />
                  Atualizado em:
                  <p>
                    {moment(currentTable.updated_at).format('DD/MM/YY HH:mm')}
                  </p>
                </>
              )}
            </div>

            <div className={styles.buttonsContainer}>
              {!onEdition && (
                <>
                  <button
                    onClick={handleClose}
                    type="button"
                    className={styles.button}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.button}>
                    Salvar
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </section>
    </AddEditModal>
  )
}
export default TableModal
