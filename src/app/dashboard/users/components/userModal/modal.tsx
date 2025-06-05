import { use } from 'react'
import AddEditModal from '../../../_components/modals/addEdit'
import { UserContext } from '@/contexts/user'
import styles from './modal.module.css'
import Dropdown from '../../../_components/dropDown'
import { toast } from 'sonner'
import moment from 'moment'
import { UserRole } from '@/types/user.type'
import { Button } from '@/app/_components/button'

const UserModal: React.FC = () => {
  const {
    isUserModalOpen,
    currentUser,
    newUser,
    onEdition,
    loggedUser,
    setUserModalOpen,
    setcurrentUser,
    setOnEdition,
    handleUserSubmit
  } = use(UserContext)

  const handleClose = () => {
    setUserModalOpen(false)
    setcurrentUser(newUser)
    setOnEdition(true)
  }
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const role = formData.get('role') as UserRole
    const password = formData.get('password') as string

    if (currentUser.id === loggedUser?.id && role !== loggedUser.role) {
      toast.error('Você não pode alterar o seu próprio tipo de usuário!')
      setOnEdition(true)
      return
    }

    await handleUserSubmit({ name, email, role, password })
  }

  const handleEditi = () => {
    setOnEdition(!onEdition)
  }
  return (
    <AddEditModal
      isOpen={isUserModalOpen}
      modalTitle={
        currentUser.id ? `Editar ${currentUser.name}` : 'Adicionar Usuario'
      }
      onCancel={handleClose}
      enableEdition={currentUser.id ? handleEditi : undefined}
    >
      <section className={styles.formulary}>
        <form className={styles.form} action={handleSubmit}>
          <div className={styles.inputsConteiner}>
            <div className={styles.inputRow}>
              <input
                type="name"
                required
                name="name"
                disabled={onEdition}
                defaultValue={currentUser.name}
                placeholder="Digite seu nome..."
                className={styles.input}
              />
              <input
                type="email"
                required
                disabled={onEdition}
                name="email"
                defaultValue={currentUser.email}
                placeholder="Digite seu email..."
                className={styles.input}
              />
            </div>
            <div className={styles.inputRow}>
              {!currentUser.id && (
                <input
                  type="password"
                  required
                  disabled={onEdition}
                  name="password"
                  placeholder="Digite a senha..."
                  className={styles.input}
                />
              )}

              <Dropdown
                disabled={onEdition}
                defaultValue={currentUser.role}
                name="role"
                options={[
                  { label: 'Usuário', value: UserRole.USER },
                  { label: 'Administrador', value: UserRole.ADMIN }
                ]}
                width="100%"
              />
            </div>
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
                  <Button onClick={handleClose} name="Cancelar" type="button" />

                  <Button name="Salvar" type="submit" />
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
