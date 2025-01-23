import { Orders } from './components/orders'
import { getCookieServer } from '@/lib/cookieServer'
import { OrderProps } from '@/lib/order.type'
import { serviceConsumer } from '@/services/service.consumer'
import ToastHandler from '@/lib/toastHandler'

async function getOrders(): Promise<OrderProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/orders')
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}

export default async function Dashboard() {
  const orders = await getOrders()
  return (
    <>
      <ToastHandler />
      <Orders orders={orders} />
    </>
  )
}
