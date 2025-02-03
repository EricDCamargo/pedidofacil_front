import { serviceConsumer } from '../service.consumer'
import { getCookieServer } from '@/lib/cookieServer'
import { OrderProps } from '@/types/order.type'

async function handleDetailTableOrders(
  table_id: string
): Promise<OrderProps[] | []> {
  //it can be called inside the [table_id] route ro retrive the details of that table
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/orders', {
      table_id
    })
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}
export { handleDetailTableOrders }
