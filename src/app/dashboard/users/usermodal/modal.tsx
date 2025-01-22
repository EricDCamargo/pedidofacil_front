'use client'
import { use } from 'react'
import AddEditModal from '../../components/modal'
import { UserContext } from '@/providers/user'
import styles from './modal.module.css'
import Dropdown from '../../components/dropDown'
import { toast } from 'sonner'

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
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' }
              ]}
              width="50%"
            />
          </div>
          {!onEdition && (
            <div className={styles.modalFooter}>
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
            </div>
          )}
        </form>
      </section>
    </AddEditModal>
  )
}
export default UserModal
