import DetailTableOrdersPage from '../components/tableOrdersPage'
import { handleDetailTableOrders } from '@/services/retriveSSRData/retriveTableOrdersData'
export default async function DetailTableOrders({
  params
}: {
  params: Promise<{ table_id: string }>
}) {
  const { table_id } = await params
  const currentOrders = await handleDetailTableOrders(table_id)

  return (
    <DetailTableOrdersPage orders={currentOrders} currentTableId={table_id} />
  )
}
