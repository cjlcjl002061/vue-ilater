import { AxiosResponse } from 'axios'
import { App } from 'vue'
import request from './axios.config'
import {ElMessage, ElMessageBox} from "element-plus";
import {baseUrl} from "@/api/url";

export interface HttpOption {
  url: string
  data?: any
  result?:any
  method?: string
  headers?: any
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response<T = any> {
  code: number
  msg: string
  data: T
}

function http<T = any>({
  url,
  data,
  result,
  method,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    if (res.status === 200) {
      // console.log("this is res: ",res)
      if (res.data.code == 401){
        // ElMessage.error('登录失效，请重新登录')
        ElMessageBox.alert('登录失效，请重新登录', '提示',
            {
                showClose:false,
            confirmButtonText: '确认',
            }).finally(()=>{
          location.href=baseUrl+'snibe/loginPage'
        })

      }
      return res.data
    }

    throw new Error(res.data.msg || '请求失败，未知异常')

    // throw "未标注状态码"
  }
  const failHandler = (error: Response<Error>) => {
    afterRequest && afterRequest()
    // throw new Error(error.msg || '请求失败，未知异常')
    throw 'failHandler'
  }
  beforeRequest && beforeRequest()
  method = method || 'GET'
  const params = Object.assign(
    typeof data === 'function' ? data() : data || {},
    {}
  )

  return method === 'GET'
    ? request.get(url, { params }).then(successHandler, failHandler)
    : request
        .post(url, params, { headers: headers })
        .then(successHandler, failHandler)
}

export function get<T = any>({
  url,
  data,
  method = 'GET',
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>({
  url,
  data,
  method = 'POST',
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}

function install(app: App): void {
  app.config.globalProperties.$http = http

  app.config.globalProperties.$get = get

  app.config.globalProperties.$post = post
}

export default {
  install,
  get,
  post,
}

declare module '@vue/runtime-core' {
  // 为 `this.$` 提供类型声明
  interface ComponentCustomProperties {
    $get: <T>(options: HttpOption) => Promise<Response<T>>
    $post: <T>(options: HttpOption) => Promise<Response<T>>
  }
}
