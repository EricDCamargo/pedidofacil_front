import { use } from 'react'
import AddEditModal from '../../components/modal'
import { UserContext } from '@/providers/user'
import styles from './modal.module.css'
import Dropdown from '../../components/dropDown'
import { toast } from 'sonner'
import moment from 'moment'
import { UserRole } from '@/types/user'
import { serviceConsumer } from '@/services/service.consumer'

const UserModal: React.FC = () => {
  const {
    isUserModalOpen,
    currentUser,
    newUser,
    onEdition,
    loggedUser,
    setUserModalOpen,
    setcurrentUser,
    setOnEdition
  } = use(UserContext)

  const handleClose = () => {
    setUserModalOpen(false)
    setcurrentUser(newUser)
    setOnEdition(true)
  }
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const role = formData.get('role')
    const password = formData.get('password')

    if (!name || !email || !role) {
      return
    }
    if (currentUser.id === loggedUser?.id && role != loggedUser.role) {
      toast.error('Você não pode alterar o seu próprio tipo de usuário!')
      setOnEdition(true)
      return
    }

    if (currentUser.id) {
      try {
        const data = {
          name: name,
          email: email,
          role: role as UserRole
        }
        const res = await serviceConsumer('').executePut(
          'users',
          { user_id: currentUser.id },
          data
        )
        if (res.isOk) {
          toast.success('Usuário editado com sucesso!')
        }
      } catch (err) {
        console.log(err)
        toast.error('Erro ao editar')
        setOnEdition(true)
        return
      }
    } else {
      if (!password) {
        return
      }
      try {
        const data = {
          name: name,
          email: email,
          role: role as UserRole,
          password: password
        }
        const res = await serviceConsumer('').executePost('users', data)
        if (res.isOk) {
          toast.success('Usuário criado com sucesso!')
          setUserModalOpen(false)
        }
        if (res.status === 409) {
          toast.error('E-mail já cadastrado!')
          return
        }
      } catch (err) {
        console.log(err)
        toast.error('Erro ao cadastrar')
        setUserModalOpen(false)
        setOnEdition(true)
        return
      }
    }
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
      enableEdition={handleEditi}
    >
      <section className={styles.formulary}>
        <form action={handleSubmit}>
          <div className={styles.inputsConteiner}>
            <div>
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
            <div>
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
                  { label: 'User', value: UserRole.USER },
                  { label: 'Admin', value: UserRole.ADMIN }
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
