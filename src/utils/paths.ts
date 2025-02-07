import { MonitorDot, Logs, LayoutGrid, Menu, User } from 'lucide-react'

const menuItems = [
  { href: '/dashboard', icon: MonitorDot, label: 'Pagina Inicial' },
  { href: '/dashboard/product', icon: Logs, label: 'Gerenciar Produtos' },
  { href: '/dashboard/category', icon: Logs, label: 'Gerenciar Categorias' },
  { href: '/dashboard/tables', icon: LayoutGrid, label: 'Gerenciar Mesas' },
  { href: '/dashboard/orders', icon: Menu, label: 'Gerenciar Pedidos' },
  { href: '/dashboard/users', icon: User, label: 'Gerenciar Usuarios' }
]

export { menuItems }
