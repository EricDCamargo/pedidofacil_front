'use client'

import { NewProductProps, ProductProps } from '@/types/product.type'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'

type ProductContextData = {
  isProductModalOpen: boolean
  newProduct: ProductProps
  currentProduct: ProductProps
  onEdition: boolean
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setProductModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentProduct: Dispatch<SetStateAction<ProductProps>>
}

type ProductProviderProps = {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextData)

const newProduct: ProductProps = {
  id: '',
  name: '',
  price: 0,
  description: '',
  banner: '',
  category_id: '',
  created_at: '',
  updated_at: '',
  category: {
    id: '',
    name: '',
    created_at: '',
    updated_at: ''
  }
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [onEdition, setOnEdition] = useState<boolean>(true)
  const [isProductModalOpen, setProductModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<ProductProps>(newProduct)

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        isProductModalOpen,
        newProduct,
        onEdition,
        setOnEdition,
        setProductModalOpen,
        setCurrentProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
