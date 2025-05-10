import { io } from 'socket.io-client'

const baseURL = process.env.NEXT_PUBLIC_API_URL

const socket = io(baseURL, {
  transports: ['websocket']
})

export default socket
