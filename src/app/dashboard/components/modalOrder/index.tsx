'use client'

import styles from './styles.module.css'
import { Trash2, X } from 'lucide-react'
import { ChangeEvent, useContext, useState } from 'react'
import { OrderProps } from '@/types/order.type'
import { formatCurrency } from '@/utils'
import ConfirmModal from '../modals/confirm'
import Dropdown from '../dropDown'
import { toast } from 'sonner'
import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'
import { getCookieServer } from '@/lib/cookieServer'
import { OrderContext } from '@/providers/order'
import { getLabel, OrderStatus } from '@/utils/recordStatus'

interface OrderModalProps {
  isOpen: boolean
  order: OrderProps
  onClose: () => void
}

const OrderModal = ({ isOpen, order, onClose }: OrderModalProps) => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false)
  const [isDeletePaymentModalOpen, setDeletePaymentModalOpen] =
    useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [paymentValue, setPaymentValue] = useState<string>('')

  const { setSelectedOrder } = useContext(OrderContext)

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, '')

    if (!rawValue) {
      setPaymentValue('0.00')
      return
    }
    const floatValue = (parseInt(rawValue) / 100).toFixed(2)

    setPaymentValue(floatValue)
  }

  const handleFetchOrder = async () => {
    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executeGet('/order/detail', {
        order_id: order.id
      })
      if (res.isOk && res.status === StatusCodes.OK) {
        setSelectedOrder(res.data)
      } else {
        toast.error(res.message)
        return
      }
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao buscar o pedido!')
      return
    }
  }

  const handleDeletePayment = async (payment_id: string) => {
    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executeDelete('/order/payment', {
        payment_id
      })
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
        handleFetchOrder()
      } else {
        toast.error(res.message)
        return
      }
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao cancelar o pagamento!')
      return
    }
  }

  const handleSubmitPayment = async () => {
    const data = {
      order_id: order.id,
      payment_method: paymentMethod,
      value: paymentValue
    }
    if (!data.order_id || !data.payment_method || !data.value) {
      toast.warning('Necessario informar todos os dados!')
      return
    }

    console.log(data)

    try {
      const token = await getCookieServer()
      const res = await serviceConsumer(token).executePost(
        '/order/payment',
        data
      )
      if (res.isOk && res.status === StatusCodes.OK) {
        toast.success(res.message)
        setPaymentModalOpen(false)
        handleFetchOrder()
      } else {
        toast.error(res.message)
        return
      }
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao realizar o pagamento!')
      return
    }
  }
  const handleCancel = () => {
    setPaymentModalOpen(false)
    setPaymentMethod('')
    setPaymentValue('')
  }
  const paymentOptions = [
    { value: '', label: 'Forma de pagamento' },
    { value: 'credit_card', label: 'Cartão de Crédito' },
    { value: 'debit_card', label: 'Cartão de Débito' },
    { value: 'cash', label: 'Dinheiro' },
    { value: 'pix', label: 'Pix' }
  ]

  if (isOpen) {
    return (
      <dialog className={styles.dialogContainer}>
        <section className={styles.dialogContent}>
          <header className={styles.header}>
            <div className={styles.title}>
              <h2>Detalhes do pedido</h2> - {getLabel(order.status)}
            </div>

            <button className={styles.dialogBack} onClick={onClose}>
              <X size={40} color="#FF3f4b" />
            </button>
          </header>
          <section className={styles.body}>
            <article className={styles.container}>
              <div>
                <span className={styles.table}>
                  Pedido <b>{order.number}</b>
                </span>

                {order?.name && (
                  <span className={styles.name}>
                    <b>{order.name}</b>
                  </span>
                )}
              </div>

              {order.items.map(item => (
                <section className={styles.item} key={item.id}>
                  <span>
                    Qtd: {item.amount} - <b>{item.product.name}</b> - R${' '}
                    {item.product.price * item.amount}
                  </span>
                  <span className={styles.description}>
                    {item.product.description}
                  </span>
                </section>
              ))}

              <h3 className={styles.total}>
                Valor total: R$ {formatCurrency(order.total)}
              </h3>
            </article>
            <article className={styles.container}>
              <h4>Pagamentos</h4>
              {order.paymentOrders.map(paymentOrder => (
                <section className={styles.item} key={paymentOrder.id}>
                  <span className={styles.paymentInfo}>
                    <button
                      onClick={() =>
                        handleDeletePayment(paymentOrder.payment.id)
                      }
                    >
                      <Trash2 />
                    </button>
                    Valor: {formatCurrency(paymentOrder.value)} - Troco:{' '}
                    <b>{formatCurrency(paymentOrder.payment.change)}</b>
                  </span>
                </section>
              ))}

              {order.status !== OrderStatus.PAID && (
                <button
                  className={styles.buttonOrder}
                  onClick={() => setPaymentModalOpen(true)}
                >
                  Registrar pagamento
                </button>
              )}
            </article>
          </section>
        </section>
        <ConfirmModal
          modalText={{
            title: 'Registrar pagamento',
            message: (
              <>
                <div className={styles.paymentForm}>
                  <Dropdown
                    defaultValue={paymentMethod}
                    options={paymentOptions}
                    name={'paymentMethod'}
                    onChange={setPaymentMethod}
                  />
                  <input
                    type="text"
                    name="paymentValue"
                    value={formatCurrency(paymentValue)}
                    onChange={handlePriceChange}
                    required
                    className={styles.input}
                    placeholder="Preço do produto..."
                  />
                </div>
              </>
            )
          }}
          isOpen={isPaymentModalOpen}
          onCancel={handleCancel}
          onConfirm={handleSubmitPayment}
        />
      </dialog>
    )
  }
  return null
}
export default OrderModal
