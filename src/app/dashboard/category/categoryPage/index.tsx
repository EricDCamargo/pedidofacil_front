'use client'

import styles from './styles.module.css'
import { serviceConsumer } from '@/services/service.consumer'
import { toast } from 'sonner'
import { CategoryProps } from '@/types/category.type'
import { BookPlus, Eye, Trash2 } from 'lucide-react'
import DataTable from '../../components/dataTable/dataTable'
import { TableColumn } from '@/types/dataTable.type'
import moment from 'moment'
import { useContext } from 'react'
import { CategoryContext } from '@/providers/category'
import ConfirmModal from '../../components/modals/confirm'
import { useRouter } from 'next/navigation'
import CategoryModal from '../categoryModal/modal'

interface CategoryPageProps {
  categories: CategoryProps[]
}
export default function CategoryPage({ categories }: CategoryPageProps) {
  const router = useRouter()
  const {
    isConfirmModalOpen,
    currentCategory,
    newCategory,
    setCategoryModalOpen,
    setConfirmModalOpen,
    setCurrentCategory,
    setOnEdition
  } = useContext(CategoryContext)

  const handleDelete = async () => {
    if (!currentCategory.id) {
      return
    }
    try {
      const res = await serviceConsumer('').executeDelete('/category', {
        category_id: currentCategory.id
      })
      if (res.isOk) {
        toast.success(res.message)
        setConfirmModalOpen(false)
        setCurrentCategory(newCategory)
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover categoria!')
    }
  }

  const handleCancel = () => {
    setConfirmModalOpen(false)
    setCurrentCategory(newCategory)
  }
  const handleAddCategory = () => {
    setCategoryModalOpen(true)
    setOnEdition(false)
  }

  const handleViewCategory = (category: CategoryProps) => {
    setCurrentCategory(category)
    setCategoryModalOpen(true)
  }
  const handleDeleteCategory = (category: CategoryProps) => {
    setCurrentCategory(category)
    setConfirmModalOpen(true)
  }

  const columns: TableColumn<CategoryProps>[] = [
    { name: 'Nome', selector: row => row.name },
    {
      name: 'Criado',
      selector: row => moment(row.created_at).format('DD/MM/YYYY HH:MM')
    },
    {
      name: 'Editado',
      selector: row => moment(row.updated_at).format('DD/MM/YYYY HH:MM')
    },

    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewCategory(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDeleteCategory(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
  ]

  return (
    <main className={styles.container}>
      <div className={styles.categoryHeader}>
        <h1 className={styles.title}>Categorias</h1>
        <button className={styles.addCategory} onClick={handleAddCategory}>
          <p className={styles.buttonText}>Adicionar Gategoria</p>
          <BookPlus />
        </button>
      </div>

      <DataTable columns={columns} data={categories} />
      <CategoryModal />
      <ConfirmModal
        modalText={{
          title: 'Remover Categoria',
          message: (
            <>
              Tem certeza quer remover categoria? <br />
              <br />
              {<strong>{currentCategory.name}</strong>}
            </>
          )
        }}
        isOpen={isConfirmModalOpen}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />
    </main>
  )
}
