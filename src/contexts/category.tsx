'use client'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { CategoryProps } from '@/types/category.type'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState
} from 'react'
import { toast } from 'sonner'

type CategoryContextData = {
  newCategory: CategoryProps
  isCategoryModalOpen: boolean
  isConfirmModalOpen: boolean
  onEdition: boolean
  currentCategory: CategoryProps
  setCategoryModalOpen: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setCurrentCategory: Dispatch<SetStateAction<CategoryProps>>
  handleCategorySubmit: (DATA: { name: string }) => Promise<void>
  handleCategoryDelete: () => Promise<void>
}

type CategoryProviderProps = {
  children: ReactNode
}

export const newCategory: CategoryProps = {
  id: '',
  name: '',
  created_at: '',
  updated_at: ''
}

export const CategoryContext = createContext({} as CategoryContextData)

export function CategoryProvider({ children }: CategoryProviderProps) {
  const router = useRouter()
  const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [onEdition, setOnEdition] = useState<boolean>(true)

  const [currentCategory, setCurrentCategory] =
    useState<CategoryProps>(newCategory)

  const handleCategorySubmit = useCallback(
    async (DATA: { name: string }) => {
      const isUpdate = !!currentCategory.id
      const token = await getCookieServer()
      try {
        const res = isUpdate
          ? await serviceConsumer(token).executePut(
              '/category',
              { category_id: currentCategory.id },
              DATA
            )
          : await serviceConsumer(token).executePost('category', DATA)
        if (
          res.isOk &&
          (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK)
        ) {
          toast.success(res.message)
          setCategoryModalOpen(false)
          setCurrentCategory(newCategory)
          setOnEdition(true)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} categoria!`)
        setOnEdition(true)
      }
    },
    [currentCategory]
  )

  const handleCategoryDelete = async () => {
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

  return (
    <CategoryContext.Provider
      value={{
        newCategory,
        isCategoryModalOpen,
        isConfirmModalOpen,
        onEdition,
        currentCategory,
        setCategoryModalOpen,
        setConfirmModalOpen,
        setOnEdition,
        setCurrentCategory,
        handleCategorySubmit,
        handleCategoryDelete
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
