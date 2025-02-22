import { Header } from './components/header'
import { OrderProvider } from '@/providers/order'
import { PagesMenu } from './components/menu'
import styles from './layout.module.css'
import { UserProvider } from '@/providers/user'
import { getUserServer } from '@/services/retriveSSRData/retriveUserData'
import { TableProvider } from '@/providers/table'
import { ProductProvider } from '@/providers/product'
import { CategoryProvider } from '@/providers/category'

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
          <TableProvider>
            <ProductProvider>
              <CategoryProvider>
                <Header />
                <div className={styles.content}>
                  <PagesMenu />
                  {children}
                </div>
              </CategoryProvider>
            </ProductProvider>
          </TableProvider>
        </UserProvider>
      </OrderProvider>
    </div>
  )
}
