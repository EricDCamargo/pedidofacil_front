export interface TableProps {
  id: string
  number: string
  status: TableStatus.AVAILABLE | TableStatus.OCCUPIED
  created_at: string
  updated_at: string
}
export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED'
}
