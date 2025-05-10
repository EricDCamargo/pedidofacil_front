import { getProducts } from '@/services/retriveSSRData/retriveProductData'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'
import ProductsPage from './components/productsPage'

export default async function Product() {
  const productData = await getProducts()
  const categoryData = await getCategories()

  return <ProductsPage categories={categoryData} products={productData} />
}
