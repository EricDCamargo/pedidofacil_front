'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { UserProps } from '@/types/user'
import { getCookieServer } from '@/lib/cookieServer'

export async function getUserServer(): Promise<UserProps | null> {
  try {
    const token = await getCookieServer()
    if (!token) return null

    const response = await serviceConsumer(token).executeGet('/me')
    return response.data as UserProps
  } catch (error) {
    return null
  }
}
