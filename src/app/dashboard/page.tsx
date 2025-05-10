import { TableOrders } from './tableOrders'
import { getTables } from '@/services/retriveSSRData/retriveTableData'

export default async function Dashboard() {
  const tables = await getTables()

  return <TableOrders tablesData={tables} />
}
