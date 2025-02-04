'use client'

import { CategoryProps } from '@/types/category.type'
import { formatProduct, ProductProps } from '@/types/product.type'
import { CirclePlus, Eye, Trash2 } from 'lucide-react'
import styles from './styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '@/providers/product'
import { AddEditProduct } from '../addEditProduct'
import ConfirmModal from '@/app/dashboard/components/modals/confirm'
import Dropdown from '@/app/dashboard/components/dropDown'
import { formatCurrency, getCategoryOptions } from '@/utils'
import { getProducts } from '@/services/retriveSSRData/retriveProductData'
import { SearchInput } from '@/app/dashboard/components/searchInput'
import DataTable from '@/app/dashboard/components/dataTable/dataTable'
import { TableColumn } from '@/types/dataTable.type'
import Image from 'next/image'

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
    handleDelete,
    handleProductSubmit
  } = useContext(ProductContext)

  const [currentProducts, setCurrentProducts] =
    useState<ProductProps[]>(products)

  const [searchValue, setSearchValue] =
    useState<ProductProps[]>(currentProducts)

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

  const handleViewProduct = (product: ProductProps) => {
    setCurrentProduct(formatProduct(product))
    setProductModalOpen(true)
  }
  const handleDeleteProduct = (product: ProductProps) => {
    setCurrentProduct(formatProduct(product))
    setConfirmModalOpen(true)
  }

  useEffect(() => {
    fetchProducts()
  }, [handleDelete, handleProductSubmit])

  const fetchProducts = async () => {
    const NewProductList = await getProducts(selectedCategory)
    setCurrentProducts(NewProductList)
  }

  const columns: TableColumn<ProductProps>[] = [
    {
      name: 'Imagem',
      cell: row => (
        <Image width={70} height={70} src={row.banner} alt="Foto do produto" />
      )
    },
    { name: 'Nome', selector: row => row.name },
    {
      name: '	Preço',
      selector: row => formatCurrency(row.price.toString())
    },
    { name: 'Descrição', selector: row => row.description },
    {
      name: 'Ações',
      cell: row => (
        <div className={'actions'}>
          <button onClick={() => handleViewProduct(row)}>
            <Eye />
          </button>
          <button onClick={() => handleDeleteProduct(row)}>
            <Trash2 />
          </button>
        </div>
      )
    }
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

      <DataTable columns={columns} data={searchValue} />
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
