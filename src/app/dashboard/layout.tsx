import { Header } from './components/header'
import { OrderProvider } from '@/providers/order'
import { PagesMenu } from './components/menu'
import styles from './layout.module.css'
import { UserProvider } from '@/providers/user'
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.grid}>
      <Header />
      <OrderProvider>
        <UserProvider>
          <div className={styles.content}>
            <PagesMenu />
            {children}
          </div>
        </UserProvider>
      </OrderProvider>
    </div>
  )
}
