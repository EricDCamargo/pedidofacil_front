import DetailTableOrdersPage from '../components/tableOrdersPage'
import { handleDetailTableOrders } from '@/services/retriveSSRData/retriveTableOrdersData'
export default async function DetailTableOrders({
  params
}: {
  params: { table_id: string }
}) {
  const currentOrders = await handleDetailTableOrders(params.table_id)

  return <DetailTableOrdersPage currentOrders={currentOrders} />
}
