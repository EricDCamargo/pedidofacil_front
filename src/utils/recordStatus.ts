enum OrderStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PAID = 'PAID',
  CLOSED = 'CLOSED'
}

enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
const orderStatusLabels: Record<string, string> = {
  [OrderStatus.DRAFT]: 'Rascunho',
  [OrderStatus.IN_PROGRESS]: 'Em andamento',
  [OrderStatus.COMPLETED]: 'Concluído',
  [OrderStatus.PAID]: 'Pago',
  [OrderStatus.CLOSED]: 'Fechado'
}

const tableStatusLabels: Record<string, string> = {
  [TableStatus.AVAILABLE]: 'Disponível',
  [TableStatus.OCCUPIED]: 'Ocupada',
  [TableStatus.RESERVED]: 'Reservada'
}

const roleLabels: Record<string, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.USER]: 'Usuário'
}

const getLabel = (key: string): string => {
  if (Object.values(OrderStatus).includes(key as OrderStatus)) {
    return orderStatusLabels[key] ?? 'Status desconhecido'
  }

  if (Object.values(TableStatus).includes(key as TableStatus)) {
    return tableStatusLabels[key] ?? 'Status desconhecido'
  }

  if (Object.values(Role).includes(key as Role)) {
    return roleLabels[key] ?? 'Função desconhecida'
  }

  return 'Valor desconhecido'
}

export { getLabel, OrderStatus, Role, TableStatus }
