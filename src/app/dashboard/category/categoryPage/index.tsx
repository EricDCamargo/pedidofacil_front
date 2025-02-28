'use client'

import { serviceConsumer } from '@/services/service.consumer'
import { toast } from 'sonner'
import { CategoryProps } from '@/types/category.type'
import { BookPlus, Eye, Trash2 } from 'lucide-react'
import DataTable from '../../_components/dataTable/dataTable'
import { TableColumn } from '@/types/dataTable.type'
import moment from 'moment'
import { useContext } from 'react'
import { CategoryContext } from '@/contexts/category'
import ConfirmModal from '../../_components/modals/confirm'
import { useRouter } from 'next/navigation'
import CategoryModal from '../categoryModal/modal'
import PageLayout from '../../_components/PageLayout/pageLayout'

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
      const res = await serviceConsumer().executeDelete('/category', {
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
    <PageLayout
      headerProps={{
        title: 'Categorias',
        button: {
          buttonLabel: 'Adicionar Gategoria',
          buttonIcon: <BookPlus />,
          onButtonClick: handleAddCategory
        }
      }}
    >
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
    </PageLayout>
  )
}
