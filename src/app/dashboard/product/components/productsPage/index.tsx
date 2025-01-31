'use client'

import { CategoryProps } from '@/types/category.type'
import { ProductProps } from '@/types/product.type'
import { UserRoundPlus } from 'lucide-react'
import styles from './styles.module.css'
import ProductTable from '../table/product.table'
import { useContext } from 'react'
import { ProductContext } from '@/providers/product'
import { AddProduct } from '../addproduct'
import ConfirmModal from '@/app/dashboard/components/modals/confirm'
import { serviceConsumer } from '@/services/service.consumer'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface PrductsPageProps {
  products: ProductProps[]
  categories: CategoryProps[]
}
export default function ProductsPage({
  products,
  categories
}: PrductsPageProps) {
  const router = useRouter()
  const {
    newProduct,
    currentProduct,
    isConfirmModalOpen,
    isProductModalOpen,
    setProductModalOpen,
    setOnEdition,
    setConfirmModalOpen,
    setCurrentProduct
  } = useContext(ProductContext)

  const handleDelete = async () => {
    if (!currentProduct.id) {
      return
    }
    try {
      const res = await serviceConsumer('').executeDelete('/product', {
        product_id: currentProduct.id
      })
      if (res.isOk) {
        toast.success(res.message)
        setConfirmModalOpen(false)
        setCurrentProduct(newProduct)
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      toast.error('Erro ao remover produto!')
    }
  }

  const handleAddProduct = () => {
    setProductModalOpen(true)
    setOnEdition(false)
  }
  const handleCancel = () => {
    setConfirmModalOpen(false)
    setCurrentProduct(newProduct)
  }
  return (
    <div className={styles.container}>
      <div className={styles.productHeader}>
        <h1>Lista de produtos</h1>
        <button className={styles.addProduct} onClick={handleAddProduct}>
          <p>Adicionar Produto</p>
          <UserRoundPlus />
        </button>
      </div>
      <ProductTable products={products} />
      <AddProduct isOpen={isProductModalOpen} categories={categories} />
      <ConfirmModal
        modalText={{
          title: 'Remover Produto',
          message: (
            <>
              Tem certeza quer remover esse produto? <br />
              <br />
              {
                <strong>
                  {currentProduct.name} <br />
                </strong>
              }
            </>
          )
        }}
        isOpen={isConfirmModalOpen}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />
    </div>
  )
}
