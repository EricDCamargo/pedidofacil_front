import { TableOrders } from './tableOrders'
import ToastHandler from '@/lib/toastHandler'
import { getTables } from '@/services/retriveSSRData/retriveTableData'

export default async function Dashboard() {
  const tables = await getTables()

  return (
    <>
      <ToastHandler />
      <TableOrders tablesData={tables} />
    </>
  )
}
