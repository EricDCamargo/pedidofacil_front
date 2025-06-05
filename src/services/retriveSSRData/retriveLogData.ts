'use server'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '../service.consumer'
import { LogProps } from '@/types/log.type'

interface GetLogsParams {
  user_id?: string
  startDate?: string
  endDate?: string
}

export async function getLogs(
  params?: GetLogsParams
): Promise<LogProps[] | []> {
  try {
    const token = await getCookieServer()

    const response = await serviceConsumer(token).executeGet(
      '/logs',
      params && {
        ...(params.user_id && { user_id: params.user_id }),
        ...(params.startDate && { startDate: params.startDate }),
        ...(params.endDate && { endDate: params.endDate })
      }
    )
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}
