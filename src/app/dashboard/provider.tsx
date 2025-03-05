import { OrderProvider } from '@/contexts/order'
import { TableProvider } from '@/contexts/table'
import { ProductProvider } from '@/contexts/product'
import { CategoryProvider } from '@/contexts/category'
import { UserProvider } from '@/contexts/user'
import { getUserServer } from '@/services/retriveSSRData/retriveUserData'

export default async function DashBoardProvider({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getUserServer()
  return (
    <UserProvider sessionUser={user}>
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
