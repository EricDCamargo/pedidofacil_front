import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '../service.consumer'
import { ProductProps } from '@/types/product.type'

export async function getProducts(): Promise<ProductProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/products')
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}
