import {
  MonitorDot,
  Logs,
  LayoutGrid,
  Menu,
  User,
  LucideProps
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface MenuItemsProps {
  href: string
  subHref?: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  label: string
}

const menuItems: MenuItemsProps[] = [
  {
    href: '/dashboard',
    subHref: '/detailTableOrders',
    icon: MonitorDot,
    label: 'Pagina Inicial'
  },
  { href: '/dashboard/product', icon: Logs, label: 'Gerenciar Produtos' },
  { href: '/dashboard/category', icon: Logs, label: 'Gerenciar Categorias' },
  { href: '/dashboard/tables', icon: LayoutGrid, label: 'Gerenciar Mesas' },
  { href: '/dashboard/orders', icon: Menu, label: 'Gerenciar Pedidos' },
  { href: '/dashboard/users', icon: User, label: 'Gerenciar Usuarios' }
]

export { menuItems }
