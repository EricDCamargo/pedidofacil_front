'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ToastHandler from '@/lib/toastHandler'
import { toast } from 'sonner'
import { handleLogin } from '@/services/retriveSSRData/retriveUserData'

export default function Home() {
  async function handleClientAction(formData: FormData) {
    const result = await handleLogin(formData)

    if (result.error) {
      toast.error(result.error)
    } else if (result.success) {
      toast.success(result.success)
      redirect('/dashboard')
    }
  }
  return (
    <>
      <ToastHandler />
      <div className={styles.containerCenter}>
        <Image src="/logo.svg" alt="Pedido Facil" width={180} height={38} />

        <section className={styles.login}>
          <form className={styles.form} action={handleClientAction}>
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
