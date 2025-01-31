import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '../service.consumer'
import { ProductProps } from '@/types/product.type'

export async function getProducts(
  category_id?: string
): Promise<ProductProps[] | []> {
  const URL = category_id ? `/category/product` : `/products`
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet(
      URL,
      category_id && {
        category_id
      }
    )
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}
