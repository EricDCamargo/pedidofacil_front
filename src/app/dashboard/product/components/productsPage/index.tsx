'use client'

import { CategoryProps } from '@/types/category.type'
import { ProductProps } from '@/types/product.type'
import { UserRoundPlus } from 'lucide-react'
import styles from './styles.module.css'
import ProductTable from '../table/product.table'
import { useContext } from 'react'
import { ProductContext } from '@/providers/product'
import { AddProduct } from '../addproduct'

interface PrductsPageProps {
  products: ProductProps[]
  categories: CategoryProps[]
}
export default function ProductsPage({
  products,
  categories
}: PrductsPageProps) {
  const { isProductModalOpen, setProductModalOpen } = useContext(ProductContext)
  return (
    <div className={styles.container}>
      <div className={styles.productHeader}>
        <h1>Lista de produtos</h1>
        <button
          className={styles.addProduct}
          onClick={() => setProductModalOpen(true)}
        >
          <p>Adicionar Produto</p>
          <UserRoundPlus />
        </button>
      </div>
      <ProductTable products={products} />
      <AddProduct isOpen={isProductModalOpen} categories={categories} />
    </div>
  )
}
