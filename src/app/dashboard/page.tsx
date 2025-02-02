import { TableOrders } from './tableOrders'
import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import ToastHandler from '@/lib/toastHandler'
import { TableProps } from '@/types/table.type'

async function getTables(): Promise<TableProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/tables')
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}

export default async function Dashboard() {
  const tables = await getTables()
  return (
    <>
      <ToastHandler />
      <TableOrders tables={tables} />
    </>
  )
}
