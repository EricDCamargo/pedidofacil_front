import { UserContext } from '@/contexts/user'
import { UserRole } from '@/types/user.type'
import { menuItems } from '@/utils/paths'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SetStateAction, useContext } from 'react'
import styles from './styles.module.css'
import { deleteCookie } from 'cookies-next'
import { toast } from 'sonner'
import { LogOutIcon } from 'lucide-react'

interface HamburguerMenuProps {
  setIsMenuOpen: (value: SetStateAction<boolean>) => void
}

export const HamburguerMenu = ({ setIsMenuOpen }: HamburguerMenuProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { loggedUser } = useContext(UserContext)

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

  async function handleLogout() {
    deleteCookie('session', { path: '/' })
    router.replace('/')
    toast.success('Logout feito com sucesso!')
  }
  return (
    <div className={styles.hamburguerItems}>
      <div className={styles.hamburguerDetail} />
      {filteredMenuItems.map(({ href, subHref, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setIsMenuOpen(false)}
          className={`${styles.section} ${determinatesActiveLink(
            href,
            subHref
          )}`}
        >
          <Icon /> <p>{label}</p>
        </Link>
      ))}

      <form className={styles.form} action={handleLogout}>
        <p className={styles.text}>{loggedUser?.name} </p>
        <button className={styles.button} type="submit">
          <LogOutIcon size={24} color="#FFF" />
        </button>
      </form>
    </div>
  )
}
