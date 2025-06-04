import OrdersPage from './components/ordersPage'
import { getOrders } from '@/services/retriveSSRData/retriveTableOrdersData'

export default async function Orders() {
  const orders = await getOrders()
  return <OrdersPage initialOrders={orders} />
}
