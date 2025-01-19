import axios from 'axios'

const setupAPIClient = () => {
  const api = axios.create({
    baseURL: 'http://localhost:3333'
  })
  return api
}

export const api = setupAPIClient()
