import axios, { AxiosError } from 'axios'
import { AuthTokenError } from './errors/AuthTokenErorr'

const HTTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULLFILED: 'FULLFILED',
  REJECTED: 'REJECTED'
})
const debug = {
  debugError: function (msg: string) {
    console.log('%c' + msg, 'color:' + 'tomato' + ';font-weight:bold;')
  },
  debugWarning: function (msg: string) {
    console.log('%c' + msg, 'color:' + 'yellow' + ';font-weight:bold;')
  },
  debugSuccess: function (msg: string) {
    console.log('%c' + msg, 'color:' + 'green' + ';font-weight:bold;')
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL

const setupAPIClient = () => {
  const api = axios.create({
    baseURL: baseURL
  })
  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        //not authorized user shoud be logged off
        if (typeof window !== undefined) {
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
      return Promise.reject(error)
    }
  )
  return api
}

const api = setupAPIClient()
const useApi = () => ({})

export { api, HTTTP_STATUS, debug, useApi }
