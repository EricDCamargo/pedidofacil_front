import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'
import CategoryPage from './categoryPage'

export default async function Category() {
  const packageData = await getCategories()

  return <CategoryPage categories={packageData} />
}
