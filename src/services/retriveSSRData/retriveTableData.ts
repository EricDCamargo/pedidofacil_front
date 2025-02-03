import { getCookieServer } from '@/lib/cookieServer'
import { TableProps } from '@/types/table.type'
import { serviceConsumer } from '../service.consumer'

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

export { getTables }
