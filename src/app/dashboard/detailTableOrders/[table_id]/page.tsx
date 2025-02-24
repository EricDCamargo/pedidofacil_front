import { OrderProps } from '@/types/order.type'
import DetailTableOrdersPage from '../components/tableOrdersPage'
import { handleDetailTableOrders } from '@/services/retriveSSRData/retriveTableOrdersData'

interface DetailTableOrdersProps {
  params: Promise<{
    table_id: string
  }>
}
export default async function DetailTableOrders({
  params
}: DetailTableOrdersProps) {
  const { table_id } = await params
  const currentOrders: OrderProps[] = await handleDetailTableOrders(table_id)

  return (
    <DetailTableOrdersPage orders={currentOrders} currentTableId={table_id} />
  )
}
