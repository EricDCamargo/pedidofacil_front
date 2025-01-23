import { Header } from './components/header'
import { OrderProvider } from '@/providers/order'
import { PagesMenu } from './components/menu'
import styles from './layout.module.css'
import { UserProvider } from '@/providers/user'
import { getUserServer } from '@/services/retriveUserData'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getUserServer()
  return (
    <div className={styles.grid}>
      <OrderProvider>
        <UserProvider initialUser={user}>
          <Header />
          <div className={styles.content}>
            <PagesMenu />
            {children}
          </div>
        </UserProvider>
      </OrderProvider>
    </div>
  )
}
