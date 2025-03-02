'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './styles.module.css'
import { UserContext } from '@/contexts/user'
import { useContext } from 'react'
import { UserRole } from '@/types/user.type'
import { menuItems } from '@/utils/paths'
import useWindowSize from '@/hooks/getWindowSize'

export const PagesMenu = () => {
  const pathname = usePathname()
  const { loggedUser } = useContext(UserContext)
  const size = useWindowSize()

  const filteredMenuItems =
    loggedUser?.role === UserRole.USER
      ? menuItems.filter(({ href }) =>
          ['/dashboard', '/dashboard/order'].includes(href)
        )
      : menuItems

  const determinatesActiveLink = (
    href: string,
    subHref: string | undefined
  ) => {
    if (pathname === href || (subHref && pathname.includes(subHref))) {
      return styles.active
    }
  }

  if (size.width >= 1024) {
    return (
      <div className={styles.styledPagesMenu}>
        {filteredMenuItems.map(({ href, subHref, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.menuItens} ${determinatesActiveLink(
              href,
              subHref
            )}`}
          >
            <Icon /> {label}
          </Link>
        ))}
      </div>
    )
  }
}
