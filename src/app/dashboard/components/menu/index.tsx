'use client'

import { usePathname } from 'next/navigation'
import { MonitorDot, Logs, LayoutGrid, Menu, User } from 'lucide-react'
import Link from 'next/link'
import styles from './styles.module.css'
import { UserContext } from '@/providers/user'
import { useContext } from 'react'
import { UserRole } from '@/types/user'
import { menuItems } from '@/utils/paths'

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
