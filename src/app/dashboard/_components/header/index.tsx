import Link from 'next/link'
import styles from './styles.module.css'
import Image from 'next/image'
import { HeaderMenu } from './hamburguerMenu'

export function Header() {
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

        <HeaderMenu />
      </div>
    </header>
  )
}
