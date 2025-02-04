'use client'

import styles from './styles.module.css'
import { Button } from '@/app/dashboard/components/button'
import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { toast } from 'sonner'
import { StatusCodes } from 'http-status-codes'

export default function Category() {
  const submitCategory = async (formData: FormData) => {
    const name = formData.get('name')

    if (name === '') return

    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executePost('/category', {
        name
      })

      if (res.isOk && res.status === StatusCodes.CREATED) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
        return
      }
    } catch (err) {
      console.error(err)
      toast.error('Não foi possivel cadastrar categoria!')
      return
    }
  }

  return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form className={styles.form} action={submitCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={styles.input}
        />

        <Button type="submit" name="Cadastrar" />
      </form>
    </main>
  )
}
