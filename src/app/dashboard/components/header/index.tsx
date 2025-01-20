'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'

import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Header() {
  const router = useRouter()

  async function handleLogout() {
    deleteCookie('session', { path: '/' })
    toast.success('Logout feito com sucesso!')

    router.replace('/')
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Pedido Facil"
            src="/logo.svg"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>
        {/* <nav>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>
          <Link href="/dashboard/category">Categoria</Link>
          <Link href="/dashboard/product">Produto</Link>
        </nav> */}
        <nav>
          <form action={handleLogout}>
            <p>Eric Dellai Camargo</p>
            <button type="submit">
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
