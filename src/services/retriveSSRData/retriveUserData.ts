'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { UserProps } from '@/types/user'
import { getCookieServer } from '@/lib/cookieServer'
import { StatusCodes } from 'http-status-codes'
import { cookies } from 'next/headers'

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
export async function getUsers(): Promise<UserProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/users')
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}
export async function handleLogin(formData: FormData) {
  'use server'

  const email = formData.get('email')
  const password = formData.get('password')

  try {
    const response = await serviceConsumer('').executePost('/session', {
      email,
      password
    })

    if (response.isOk && response.status === StatusCodes.OK) {
      const expressTime = 60 * 60 * 24 * 30 * 1000

      const cookieStore = await cookies()
      cookieStore.set('session', response.data.token, {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production'
      })
      return { success: response.message }
    } else {
      return { error: response.message }
    }
  } catch (err) {
    console.log(err)
    return { error: 'Erro ao fazer login. Tente novamente mais tarde!' }
  }
}
