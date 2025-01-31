'use client'

import { CategoryProps } from '@/types/category.type'
import { ProductProps } from '@/types/product.type'
import { CirclePlus } from 'lucide-react'
import styles from './styles.module.css'
import ProductTable from '../table/product.table'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '@/providers/product'
import { AddEditProduct } from '../addEditProduct'
import ConfirmModal from '@/app/dashboard/components/modals/confirm'
import Dropdown from '@/app/dashboard/components/dropDown'
import { getCategoryOptions } from '@/utils'
import { getProducts } from '@/services/retriveSSRData/retriveProductData'
import { SearchInput } from '@/app/dashboard/components/searchInput'

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
    selectedCategory,
    setSelectedCategory,
    setProductModalOpen,
    setOnEdition,
    setConfirmModalOpen,
    setCurrentProduct,
    handleDelete
  } = useContext(ProductContext)

  const [currentProducts, setCurrentProducts] =
    useState<ProductProps[]>(products)

  const [searchValue, setSearchValue] =
    useState<ProductProps[]>(currentProducts)

  useEffect(() => {
    const fetchedProducts = async () => {
      const NewProductList = await getProducts(selectedCategory)
      setCurrentProducts(NewProductList)
    }
    fetchedProducts()
  }, [selectedCategory])

  const handleAddProduct = () => {
    setProductModalOpen(true)
    setOnEdition(false)
  }
  const handleCancel = () => {
    setConfirmModalOpen(false)
    setCurrentProduct(INITIAL_PRODUCT)
  }

  const optionsWithAll = [
    { label: 'Todos', value: '' },
    ...getCategoryOptions(categories)
  ]

  return (
    <div className={styles.container}>
      <div className={styles.productHeader}>
        <h1>Lista de produtos</h1>
        <div className={styles.filterContainer}>
          <Dropdown
            defaultValue={selectedCategory}
            options={optionsWithAll}
            name={'category_id'}
            onChange={setSelectedCategory}
          />
          <SearchInput
            data={currentProducts}
            searchValue="name"
            setDateToPage={setSearchValue}
          />
        </div>
        <button className={styles.addProduct} onClick={handleAddProduct}>
          <p>Adicionar Produto</p>
          <CirclePlus />
        </button>
      </div>
      <ProductTable products={searchValue} />
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
