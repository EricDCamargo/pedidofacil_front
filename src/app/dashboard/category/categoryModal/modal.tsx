import { use } from 'react'
import AddEditModal from '../../_components/modals/addEdit'
import styles from './modal.module.css'
import { CategoryContext } from '@/contexts/category'
import { Button } from '@/app/_components/button'

const CategoryModal: React.FC = () => {
  const {
    isCategoryModalOpen,
    currentCategory,
    newCategory,
    onEdition,
    setCategoryModalOpen,
    setCurrentCategory,
    setOnEdition,
    handleCategorySubmit
  } = use(CategoryContext)

  const handleClose = () => {
    setCategoryModalOpen(false)
    setCurrentCategory(newCategory)
    setOnEdition(true)
  }
  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    await handleCategorySubmit({ name })
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
export default CategoryModal
