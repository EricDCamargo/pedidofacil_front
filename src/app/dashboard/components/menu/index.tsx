'use client'

import { usePathname, useRouter } from 'next/navigation'
import { MonitorDot, Logs, LayoutGrid, Menu, User } from 'lucide-react'
import Link from 'next/link'
import styles from './styles.module.css'

const menuItems = [
  { href: '/dashboard', icon: MonitorDot, label: 'Pagina Inicial' },
  { href: '/dashboard/product', icon: Logs, label: 'Gerenciar Produtos' },
  { href: '/dashboard/category', icon: Logs, label: 'Gerenciar Categorias' },
  { href: '/dashboard/table', icon: LayoutGrid, label: 'Gerenciar Mesas' },
  { href: '/dashboard/order', icon: Menu, label: 'Gerenciar Pedidos' },
  { href: '/dashboard/user', icon: User, label: 'Gerenciar Usuarios' }
]
export const PagesMenu = () => {
  const pathname = usePathname()
  return (
    <div className={styles.styledPagesMenu}>
      {menuItems.map(({ href, icon: Icon, label }) => (
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
