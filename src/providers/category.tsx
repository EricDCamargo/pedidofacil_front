'use client'

import { CategoryProps } from '@/types/category.type'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'

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
  const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [onEdition, setOnEdition] = useState<boolean>(true)

  const [currentCategory, setCurrentCategory] =
    useState<CategoryProps>(newCategory)

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
        setCurrentCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
