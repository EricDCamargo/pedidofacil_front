import { Header } from './components/header'
import { OrderProvider } from '@/providers/order'
import { PagesMenu } from './components/menu'
import styles from './layout.module.css'
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.grid}>
      <Header />
      <OrderProvider>
        <div className={styles.content}>
          <PagesMenu />
          {children}
        </div>
      </OrderProvider>
    </div>
  )
}
