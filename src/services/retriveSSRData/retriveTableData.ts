import { getCookieServer } from '@/lib/cookieServer'
import { Table } from '@/lib/table.type'
import { serviceConsumer } from '../service.consumer'

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

export { getTables }
