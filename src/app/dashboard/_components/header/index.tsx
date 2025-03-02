'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UserContext } from '@/contexts/user'
import { useContext, useState } from 'react'
import { AlignJustify, LogOutIcon } from 'lucide-react'
import useWindowSize from '@/hooks/getWindowSize'
import { HamburguerMenu } from './hamburguerMenu'

export function Header() {
  const router = useRouter()
  const { loggedUser } = useContext(UserContext)
  const size = useWindowSize()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  async function handleLogout() {
    deleteCookie('session', { path: '/' })
    router.replace('/')
    toast.success('Logout feito com sucesso!')
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
        {size.width < 1024 && (
          <div className={styles.hamburguerMenuArea}>
            <AlignJustify
              color="#fff"
              size={22}
              onClick={() => setIsMenuOpen(state => !state)}
            />
          </div>
        )}
        {isMenuOpen && size.width < 1024 && (
          <HamburguerMenu setIsMenuOpen={setIsMenuOpen} />
        )}

        {size.width >= 1024 && (
          <nav className={styles.nav}>
            <form className={styles.form} action={handleLogout}>
              <p className={styles.text}>{loggedUser?.name} </p>
              <button className={styles.button} type="submit">
                <LogOutIcon size={24} color="#FFF" />
              </button>
            </form>
          </nav>
        )}
      </div>
    </header>
  )
}
