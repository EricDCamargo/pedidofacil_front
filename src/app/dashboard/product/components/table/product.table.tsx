import { UserProps, UserRole } from '@/types/user.type'
import styles from './product.module.css'
import { Trash2, Eye } from 'lucide-react'
import { use, useContext } from 'react'
import { UserContext } from '@/providers/user'
import { ProductProps } from '@/providers/order'
import Image from 'next/image'
import { ProductContext } from '@/providers/product'

interface TableProps {
  products: ProductProps[]
}
export default function ProductTable({ products }: TableProps) {
  const { setProductModalOpen, setCurrentProduct } = useContext(ProductContext)
  const handleViewProduct = (product: ProductProps) => {
    setCurrentProduct(product)
    setProductModalOpen(true)
  }
  const handleDeleteProduct = (product: ProductProps) => {}
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>Imagem</th>
              <th className={styles.tableCell}>Nome</th>
              <th className={styles.tableCell}>Preço</th>
              <th className={styles.tableCell}>Descrição</th>
              <th className={styles.tableCell}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, key) => (
              <tr key={key} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <Image
                    width={70}
                    height={70}
                    src={product.banner}
                    alt="Foto do produto"
                  />
                </td>
                <td className={styles.tableCell}>
                  <p>{product.name}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>R$ {product.price}</p>
                </td>
                <td className={styles.tableCell}>
                  <p>{product.description}</p>
                </td>

                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button onClick={() => handleViewProduct(product)}>
                      <Eye />
                    </button>
                    <button onClick={() => handleDeleteProduct(product)}>
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
