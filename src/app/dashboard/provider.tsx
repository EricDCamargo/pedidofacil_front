import { OrderProvider } from '@/contexts/order'
import { UserProvider } from '@/contexts/user'
import { getUserServer } from '@/services/retriveSSRData/retriveUserData'
import { TableProvider } from '@/contexts/table'
import { ProductProvider } from '@/contexts/product'
import { CategoryProvider } from '@/contexts/category'

export default async function AppProvider({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getUserServer()
  return (
    <UserProvider initializeUser={user}>
      <OrderProvider>
        <TableProvider>
          <ProductProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </ProductProvider>
        </TableProvider>
      </OrderProvider>
    </UserProvider>
  )
}
