'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import { UserContext } from '@/contexts/user'
import { useContext } from 'react'
import useWindowSize from '@/hooks/getWindowSize'

export const PagesMenu = () => {
  const { filteredMenuItems, determinatesActiveLink } = useContext(UserContext)
  const size = useWindowSize()

  return (
    <div className={styles.styledPagesMenu}>
      {filteredMenuItems.map(({ href, subHref, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.menuItens} ${
            determinatesActiveLink(href, subHref) && styles.active
          }`}
        >
          <Icon /> {label}
        </Link>
      ))}
    </div>
  )
}
