'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { handleRegister } from '@/hooks/user/useAuth'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'sonner'
import AuthPage from '../_components/AuthPage'

export default function SignUpPage() {
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    const result = await handleRegister(formData)

    if (result.isOk && result.status === StatusCodes.CREATED) {
      toast.success(result.message)
      router.push('/')
    } else {
      toast.error(result.message)
    }
  }
  return (
    <AuthPage>
      <AuthPage.Title>Crie uma nova conta</AuthPage.Title>
      <AuthPage.Form props={{ action: onSubmit }}>
        <AuthPage.Input
          type="text"
          required
          name="name"
          placeholder="Digite seu nome..."
        />
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
      <AuthPage.Link href="/">Já possui uma conta? Faça o logIn</AuthPage.Link>
    </AuthPage>
  )
}
