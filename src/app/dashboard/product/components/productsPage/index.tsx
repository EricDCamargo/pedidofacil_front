'use client'

import { CategoryProps } from '@/types/category.type'
import { ProductProps } from '@/types/product.type'
import { CirclePlus } from 'lucide-react'
import styles from './styles.module.css'
import ProductTable from '../table/product.table'
import { useContext } from 'react'
import { ProductContext } from '@/providers/product'
import { AddEditProduct } from '../addEditProduct'
import ConfirmModal from '@/app/dashboard/components/modals/confirm'

interface PrductsPageProps {
  products: ProductProps[]
  categories: CategoryProps[]
}
export default function ProductsPage({
  products,
  categories
}: PrductsPageProps) {
  const {
    INITIAL_PRODUCT,
    currentProduct,
    isConfirmModalOpen,
    isProductModalOpen,
    setProductModalOpen,
    setOnEdition,
    setConfirmModalOpen,
    setCurrentProduct,
    handleDelete
  } = useContext(ProductContext)

  const handleAddProduct = () => {
    setProductModalOpen(true)
    setOnEdition(false)
  }
  const handleCancel = () => {
    setConfirmModalOpen(false)
    setCurrentProduct(INITIAL_PRODUCT)
  }
  return (
    <div className={styles.container}>
      <div className={styles.productHeader}>
        <h1>Lista de produtos</h1>
        <button className={styles.addProduct} onClick={handleAddProduct}>
          <p>Adicionar Produto</p>
          <CirclePlus />
        </button>
      </div>
      <ProductTable products={products} />
      <AddEditProduct isOpen={isProductModalOpen} categories={categories} />
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
