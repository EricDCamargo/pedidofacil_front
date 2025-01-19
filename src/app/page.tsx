import Image from 'next/image'
import styles from './page.module.css'

import logoImg from '/pedido_facil.svg'
import Link from 'next/link'
import { api } from '@/services/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  async function handleLogin(formData: FormData) {
    'use server'

    const email = formData.get('email')
    const password = formData.get('password')

    if (email === '' || password === '') {
      return
    }

    try {
      const response = await api.post('/session', {
        email,
        password
      })

      if (!response.data.token) {
        return
      }

      console.log(response.data)

      const expressTime = 60 * 60 * 24 * 30 * 1000

      const cookieStore = await cookies()
      cookieStore.set('session', response.data.token, {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production'
      })
    } catch (err) {
      console.log(err)
      return
    }

    redirect('/dashboard')
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src="/pedido_facil.svg"
          alt="Pedido Facil"
          width={180}
          height={38}
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email..."
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="***********"
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Acessar
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  )
}
