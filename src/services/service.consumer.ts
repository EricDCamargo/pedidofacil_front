import { getCookieClient } from '@/lib/cookieClient'
import { debug, api } from './api'

const { debugError, debugSuccess } = debug
const environment = process.env.NEXT_ENVIRONMENT
interface ResponsePromise {
  [x: string]: any
  data: any | Array<any>
  message: string
  status: number
  isOk: boolean
}

export const serviceConsumer = {
  //Get Method
  executeGet: async function (url: string, params?: any) {
    return await this.executeService('GET', url, params)
  },

  //Post Method
  executePost: async function (url: string, body: any | Array<any>) {
    return await this.executeService('POST', url, body, '')
  },

  //Put Method
  executePut: async function (url: string, body: any | Array<any>) {
    return await this.executeService('PUT', url, body)
  },

  //Delete
  executeDelete: async function (url: string) {
    return await this.executeService('DELETE', url)
  },

  executeService: function (
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    url: string,
    data?: any | Array<any>,
    params?: any
  ): Promise<ResponsePromise> {
    let headers = {
      Authorization: 'Bearer ' + getCookieClient(),
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
}
