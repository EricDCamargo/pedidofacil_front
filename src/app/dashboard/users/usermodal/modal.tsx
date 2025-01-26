import { use } from 'react'
import AddEditModal from '../../components/modals/addEdit'
import { UserContext } from '@/providers/user'
import styles from './modal.module.css'
import Dropdown from '../../components/dropDown'
import { toast } from 'sonner'
import moment from 'moment'
import { UserRole } from '@/types/user'
import { serviceConsumer } from '@/services/service.consumer'
import { useRouter } from 'next/navigation'
import { StatusCodes } from 'http-status-codes'

const UserModal: React.FC = () => {
  const router = useRouter()
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
    const role = formData.get('role') as UserRole
    const password = formData.get('password')

    if (currentUser.id === loggedUser?.id && role !== loggedUser.role) {
      toast.error('Você não pode alterar o seu próprio tipo de usuário!')
      setOnEdition(true)
      return
    }

    const updateUser = async () => {
      try {
        const res = await serviceConsumer('').executePut(
          '/users',
          { user_id: currentUser.id },
          { name, email, role }
        )
        if (res.isOk && res.status === StatusCodes.OK) {
          toast.success('Usuário editado com sucesso!')
          setUserModalOpen(false)
          router.refresh()
        } else {
          toast.error('Erro ao editar')
          setOnEdition(true)
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao editar')
        setOnEdition(true)
      }
    }

    const createUser = async () => {
      if (!password) {
        toast.error('A senha é obrigatória para cadastro')
        return
      }

      try {
        const res = await serviceConsumer('').executePost('users', {
          name,
          email,
          role,
          password
        })

        if (res.isOk && res.status === StatusCodes.OK) {
          toast.success(res.message)
          setUserModalOpen(false)
          router.refresh()
        } else if (res.status === StatusCodes.CONFLICT) {
          toast.error('Email já cadastrado!')
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao cadastrar')
        setUserModalOpen(false)
        setOnEdition(true)
      }
    }

    // DETERMINATE FORM ACTION
    if (currentUser.id) {
      await updateUser()
    } else {
      await createUser()
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
