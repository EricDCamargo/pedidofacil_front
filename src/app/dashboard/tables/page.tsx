
import { getCookieServer } from '@/lib/cookieServer'
import { OrderProps } from '@/lib/order.type'
import { serviceConsumer } from '@/services/service.consumer'
import ToastHandler from '@/lib/toastHandler'
import TablesPage from './components/tablePage'
import { Table } from '@/lib/table.type'

async function getTables(): Promise<Table[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/tables')
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}

export default async function Tables() {
  const tables = await getTables()
  return (
    <>
      <ToastHandler />
      <TablesPage tables={tables} />
    </>
  )
}
