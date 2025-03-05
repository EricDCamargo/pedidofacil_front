'use client'

import React from 'react'
import AuthPage from '../_components/AuthPage'
import { StatusCodes } from 'http-status-codes'
import { handleLogin } from '@/hooks/user/useAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const SignInPage: React.FC = () => {
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    const result = await handleLogin(formData)

    if (result.isOk && result.status === StatusCodes.OK) {
      toast.success(result.message)
      router.push('/dashboard')
    } else {
      toast.error(result.message)
    }
  }
  return (
    <AuthPage>
      <AuthPage.Form props={{ action: onSubmit }}>
        <AuthPage.Input
          type="email"
          required
          name="email"
          placeholder="Digite seu email..."
        />
        <AuthPage.Input
          type="password"
          required
          name="password"
          placeholder="***********"
        />
      </AuthPage.Form>
      <AuthPage.Link href="/auth/signup">
        Não possui uma conta? Cadastre-se
      </AuthPage.Link>
    </AuthPage>
  )
}
export default SignInPage
