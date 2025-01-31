'use client'

import { serviceConsumer } from '@/services/service.consumer'
import { ProductProps } from '@/types/product.type'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from 'react'
import { toast } from 'sonner'

type ProductContextData = {
  isProductModalOpen: boolean
  newProduct: ProductProps
  currentProduct: ProductProps
  onEdition: boolean
  isConfirmModalOpen: boolean
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  setProductModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentProduct: Dispatch<SetStateAction<ProductProps>>
  createProcuct: (DATA: FormData) => Promise<void>
  updateProcuct: (DATA: FormData) => Promise<void>
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
  const router = useRouter()
  const [onEdition, setOnEdition] = useState<boolean>(true)
  const [isProductModalOpen, setProductModalOpen] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<ProductProps>(newProduct)

  const createProcuct = async (DATA: FormData) => {
    try {
      const res = await serviceConsumer('').executePost('/product', DATA)
      if (res.isOk && res.status === StatusCodes.CREATED) {
        toast.success(res.message)
        setProductModalOpen(false)
        setCurrentProduct(newProduct)
        router.refresh()
      } else {
        toast.error(res.message)
        setOnEdition(true)
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao cadastrar produto!')
      setOnEdition(true)
    }
  }
  const updateProcuct = async (DATA: FormData) => {
    try {
      const res = await serviceConsumer('').executePut(
        '/product',
        { product_id: currentProduct.id },
        DATA
      )
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
        setProductModalOpen(false)
        setCurrentProduct(newProduct)
        router.refresh()
      } else {
        toast.error(res.message)
        setOnEdition(true)
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao editar produto!')
      setOnEdition(true)
    }
  }

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        isProductModalOpen,
        newProduct,
        onEdition,
        isConfirmModalOpen,
        setConfirmModalOpen,
        setOnEdition,
        setProductModalOpen,
        setCurrentProduct,
        createProcuct,
        updateProcuct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
