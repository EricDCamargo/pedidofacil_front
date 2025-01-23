'use client'

import { usePathname } from 'next/navigation'
import { MonitorDot, Logs, LayoutGrid, Menu, User } from 'lucide-react'
import Link from 'next/link'
import styles from './styles.module.css'
import { UserContext } from '@/providers/user'
import { useContext } from 'react'
import { UserRole } from '@/types/user'

const menuItems = [
  { href: '/dashboard', icon: MonitorDot, label: 'Pagina Inicial' },
  { href: '/dashboard/product', icon: Logs, label: 'Gerenciar Produtos' },
  { href: '/dashboard/category', icon: Logs, label: 'Gerenciar Categorias' },
  { href: '/dashboard/table', icon: LayoutGrid, label: 'Gerenciar Mesas' },
  { href: '/dashboard/order', icon: Menu, label: 'Gerenciar Pedidos' },
  { href: '/dashboard/users', icon: User, label: 'Gerenciar Usuarios' }
]
export const PagesMenu = () => {
  const pathname = usePathname()
  const { loggedUser } = useContext(UserContext)
  const filteredMenuItems =
    loggedUser?.role === UserRole.USER
      ? menuItems.filter(({ href }) =>
          ['/dashboard', '/dashboard/order'].includes(href)
        )
      : menuItems
  return (
    <div className={styles.styledPagesMenu}>
      {filteredMenuItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.menuItens} ${
            pathname === href ? styles.active : ''
          }`}
        >
          <Icon /> {label}
        </Link>
      ))}
    </div>
  )
}
