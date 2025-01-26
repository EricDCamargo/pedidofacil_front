export interface Table {
  id: number
  number: number
  status: TableStatus
  created_at: string
  updated_at: string
}
export enum TableStatus {
  available = 'available',
  occupied = 'occupied',
  reserved = 'reserved'
}
