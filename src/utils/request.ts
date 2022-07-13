import instance, { McAxiosRequestConfig } from './axios'
import { AxiosInstance, AxiosResponse } from 'axios'

type RequestMethod = 'get' | 'post'

// type Respose<T> = {
//   code: number
//   data: T
//   message?: string
// }

class Request {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  /**
   * @description: get请求，参数同axios的get方法，额外增加showLoading参数用于控制全局loading状态
   * @param {string} url
   * @param {McAxiosRequestConfig} config
   * @return Promise<AxiosResponse<any>>
   */
  public get<T>(
    url: string,
    params: Record<string, any> = {},
    config: McAxiosRequestConfig = {}
  ): Promise<T> {
    return this.request('get', url, { params, ...config })
  }

  /**
   * @description: post请求，参数同axios的post方法，额外增加showLoading参数用于控制全局loading状态
   * @param {string} url
   * @param {McAxiosRequestConfig} config
   * @return Promise<AxiosResponse<any>>
   */
  public post<T>(
    url: string,
    data: Record<string, any>,
    config: McAxiosRequestConfig = {}
  ): Promise<T> {
    return this.request('post', url, config, data)
  }

  private async request<T>(
    method: RequestMethod,
    url: string,
    config: McAxiosRequestConfig,
    ...params: any
  ): Promise<T> {
    const res = await this.instance[method](url, ...params, config)
    if (config.returnAll) {
      return res as any
    }
    return res && res.data
  }
}

export const request = new Request(instance)
