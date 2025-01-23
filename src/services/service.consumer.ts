import { CookieValueTypes } from 'cookies-next'
import { debug, api } from './api'
import { getCookieServer } from '@/lib/cookieServer'
import { getCookieClient } from '@/lib/cookieClient'

const { debugError, debugSuccess } = debug
const environment = process.env.NEXT_ENVIRONMENT
interface ResponsePromise {
  [x: string]: any
  data: any | Array<any>
  message: string
  status: number
  isOk: boolean
}

export const serviceConsumer = (
  token: string | CookieValueTypes | Promise<CookieValueTypes> | null
) => ({
  //Get Method
  executeGet: async function (url: string, params?: any) {
    return await this.executeService(token, 'GET', url, params)
  },

  //Post Method
  executePost: async function (url: string, body: any | Array<any>) {
    return await this.executeService(token, 'POST', url, '', body)
  },

  //Put Method
  executePut: async function (url: string, body: any | Array<any>) {
    return await this.executeService(token, 'PUT', url, '', body)
  },

  //Delete
  executeDelete: async function (url: string) {
    return await this.executeService(token, 'DELETE', url)
  },

  executeService: async function (
    token: string | CookieValueTypes | Promise<CookieValueTypes> | null,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    url: string,
    params?: any,
    data?: any | Array<any>
  ): Promise<ResponsePromise> {
    const getToken = () => {
      if (token) {
        return token
      } else {
        return getCookieClient()
      }
    }
    let headers = {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }

    let response

    response = api({
      method,
      url,
      params,
      headers,
      data
    })
      .then(res => {
        const { data, status, statusText } = res
        const successResponse: ResponsePromise = {
          data: data,
          status: status,
          message: statusText,
          isOk: true
        }
        if (environment === 'dev') {
          debugSuccess('-------- DEBUG - SUCCESS - START --------')
          console.log(successResponse)
          debugSuccess('-------- DEBUG - SUCCESS - END --------')
        }
        return successResponse
      })
      .catch(err => {
        const { message, status } = err
        const errorResponse: ResponsePromise = {
          data: [],
          status: status,
          message: message,
          isOk: false
        }
        if (environment === 'dev') {
          debugError('-------- DEBUG - ERROR - START --------')
          console.log(errorResponse)
          debugError('-------- DEBUG - ERROR - END --------')
        }
        return errorResponse
      })

    return response
  }
})
