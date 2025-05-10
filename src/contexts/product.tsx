'use client'

import { toast } from 'sonner'
import { serviceConsumer } from '@/services/service.consumer'
import { CurrentProductProps } from '@/types/product.type'
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

type ProductContextData = {
  isProductModalOpen: boolean
  INITIAL_PRODUCT: CurrentProductProps
  currentProduct: CurrentProductProps
  onEdition: boolean
  isConfirmModalOpen: boolean
  selectedCategory: string
  setOnEdition: Dispatch<SetStateAction<boolean>>
  setConfirmModalOpen: Dispatch<SetStateAction<boolean>>
  setProductModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentProduct: Dispatch<SetStateAction<CurrentProductProps>>
  handleProductSubmit: (DATA: any) => Promise<void>
  handleDelete: () => Promise<void>
  setSelectedCategory: Dispatch<SetStateAction<string>>
}

type ProductProviderProps = {
  children: ReactNode
}

export const ProductContext = createContext({} as ProductContextData)

const INITIAL_PRODUCT: CurrentProductProps = {
  name: '',
  price: 0,
  description: '',
  banner: '',
  category_id: ''
}

export function ProductProvider({ children }: ProductProviderProps) {
  const router = useRouter()
  const [onEdition, setOnEdition] = useState<boolean>(true)
  const [isProductModalOpen, setProductModalOpen] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] =
    useState<CurrentProductProps>(INITIAL_PRODUCT)

  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleProductSubmit = useCallback(
    async (DATA: any) => {
      const isUpdate = !!currentProduct.id
      try {
        const res = isUpdate
          ? await serviceConsumer().executePut(
              '/product',
              { product_id: currentProduct.id },
              DATA
            )
          : await serviceConsumer().executePost('/product', DATA)

        if (
          res.isOk &&
          (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK)
        ) {
          toast.success(res.message)
          setProductModalOpen(false)
          setCurrentProduct(INITIAL_PRODUCT)
          setOnEdition(true)
          router.refresh()
        } else {
          toast.error(res.message)
        }
      } catch (err) {
        console.error(err)
        toast.error(`Erro ao ${isUpdate ? 'editar' : 'cadastrar'} produto!`)
        setOnEdition(true)
      }
    },
    [currentProduct]
  )

  const handleDelete = async () => {
    if (!currentProduct.id) {
      return
    }
    try {
      const res = await serviceConsumer().executeDelete('/product', {
        product_id: currentProduct.id
      })
      if (res.isOk) {
        toast.success(res.message)
        setConfirmModalOpen(false)
        setCurrentProduct(INITIAL_PRODUCT)
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover produto!')
    }
  }

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        isProductModalOpen,
        INITIAL_PRODUCT,
        onEdition,
        isConfirmModalOpen,
        selectedCategory,
        setSelectedCategory,
        setConfirmModalOpen,
        setOnEdition,
        setProductModalOpen,
        setCurrentProduct,
        handleProductSubmit,
        handleDelete
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
