import { io } from 'socket.io-client'

const baseURL = process.env.NEXT_PUBLIC_API_URL

const socket = io(baseURL, {
  transports: ['websocket']
})

enum SocketEvents {
  ORDER_CHANGED = 'orderChanged', // Emitido quando um novo pedido é criado, atualizado ou removido
  TABLE_STATUS_CHANGED = 'tableStatusChanged', // Emitido quando o status de uma mesa muda (fechada, aberta, etc)
  PAYMENT_REGISTERED = 'paymentRegistered', // Emitido quando um pagamento é registrado
  TABLE_CLOSED = 'tableClosed', // Emitido quando uma mesa é fechada
  ORDER_SENT_TO_KITCHEN = 'orderSentToKitchen', // Emitido quando um pedido é enviado para a cozinha
  PRODUCT_UPDATED = 'productUpdated', // Emitido quando um produto é criado, editado ou removido
  CATEGORY_UPDATED = 'categoryUpdated', // Emitido quando uma categoria é criada, editada ou removida
  LOG_CREATED = 'logCreated' // Emitido quando um log é criado
}

export { socket, SocketEvents }
