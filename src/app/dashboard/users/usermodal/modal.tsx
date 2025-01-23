import { use } from 'react'
import AddEditModal from '../../components/modal'
import { UserContext } from '@/providers/user'
import styles from './modal.module.css'
import Dropdown from '../../components/dropDown'
import { toast } from 'sonner'
import moment from 'moment'

const UserModal: React.FC = () => {
  const {
    isUserModalOpen,
    currentUser,
    newUser,
    onEdition,
    setUserModalOpen,
    setcurrentUser,
    setOnEdition
  } = use(UserContext)

  const handleClose = () => {
    setUserModalOpen(false)
    setcurrentUser(newUser)
    setOnEdition(true)
  }
  const handleSubmit = (formData: FormData) => {
    'use client'
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    toast.success('sucessfully submitted')
  }

  const handleEditi = () => {
    setOnEdition(!onEdition)
  }
  return (
    <AddEditModal
      isOpen={isUserModalOpen}
      modalTitle="Usuario"
      onCancel={handleClose}
      enableEdition={handleEditi}
    >
      <section className={styles.formulary}>
        <form action={handleSubmit}>
          <div className={styles.inputsConteiner}>
            <input
              type="name"
              required
              name="name"
              disabled={onEdition}
              defaultValue={currentUser.name}
              placeholder="Digite seu email..."
              className={styles.input}
            />
            <input
              type="email"
              required
              aria-disabled={true}
              disabled={onEdition}
              name="email"
              defaultValue={currentUser.email}
              placeholder="Digite seu email..."
              className={styles.input}
            />

            <Dropdown
              disabled={onEdition}
              defaultValue={currentUser.role}
              name="role"
              options={[
                { label: 'User', value: 'user' },
                { label: 'Admin', value: 'admin' }
              ]}
              width="50%"
            />
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.date}>
              {currentUser.created_at && currentUser.created_at && (
                <>
                  Criado em:
                  <p>
                    {moment(currentUser.created_at).format('DD/MM/YY HH:mm')}
                  </p>
                  <br />
                  Atualizado em:
                  <p>
                    {moment(currentUser.updated_at).format('DD/MM/YY HH:mm')}
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
export default UserModal
