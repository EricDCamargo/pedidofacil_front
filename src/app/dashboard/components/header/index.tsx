'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { UserContext } from '@/providers/user'
import { useContext } from 'react'
import { LogOutIcon } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const { loggedUser } = useContext(UserContext)

  // const pathname = usePathname()

  // const filteredMenuItems =
  //   loggedUser?.role === UserRole.USER
  //     ? menuItems.filter(({ href }) =>
  //         ['/dashboard', '/dashboard/order'].includes(href)
  //       )
  //     : menuItems

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
          {filteredMenuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? styles.active : ''}
            >
              {label}
            </Link>
          ))}
        </nav> */}
        <nav>
          <form action={handleLogout}>
            <p>{loggedUser?.name} </p>
            <button type="submit">
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
