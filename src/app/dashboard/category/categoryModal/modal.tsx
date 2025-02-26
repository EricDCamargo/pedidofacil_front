import { use } from 'react'
import AddEditModal from '../../components/modals/addEdit'
import styles from './modal.module.css'
import { toast } from 'sonner'
import { serviceConsumer } from '@/services/service.consumer'
import { useRouter } from 'next/navigation'
import { StatusCodes } from 'http-status-codes'
import { CategoryContext } from '@/providers/category'
import { getCookieServer } from '@/lib/cookieServer'

const CategoryModal: React.FC = () => {
  const router = useRouter()
  const {
    isCategoryModalOpen,
    currentCategory,
    newCategory,
    onEdition,
    setCategoryModalOpen,
    setCurrentCategory,
    setOnEdition
  } = use(CategoryContext)

  const handleClose = () => {
    setCategoryModalOpen(false)
    setCurrentCategory(newCategory)
    setOnEdition(true)
  }
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name')

    const token = await getCookieServer()

    const updateUser = async () => {
      try {
        const res = await serviceConsumer(token).executePut(
          '/category',
          { category_id: currentCategory.id },
          { name }
        )
        if (res.isOk && res.status === StatusCodes.OK) {
          toast.success(res.message)
          setCategoryModalOpen(false)
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

    const createUser = async () => {
      try {
        const res = await serviceConsumer(token).executePost('category', {
          name
        })

        if (res.isOk && res.status === StatusCodes.CREATED) {
          toast.success(res.message)
          setCategoryModalOpen(false)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error('Erro ao cadastrar')
        setCategoryModalOpen(false)
        setOnEdition(true)
      }
    }

    // DETERMINATE FORM ACTION
    if (currentCategory.id) {
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
      isOpen={isCategoryModalOpen}
      modalTitle={
        currentCategory.id
          ? `Editar ${currentCategory.name}`
          : 'Adicionar Categoria'
      }
      onCancel={handleClose}
      enableEdition={handleEditi}
    >
      <section className={styles.formulary}>
        <form className={styles.form} action={handleSubmit}>
          <div className={styles.inputsConteiner}>
            <input
              type="name"
              required
              name="name"
              disabled={onEdition}
              defaultValue={currentCategory.name}
              placeholder="Nome da categoria..."
              className={styles.input}
            />
          </div>

          <div className={styles.modalFooter}>
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
export default CategoryModal
