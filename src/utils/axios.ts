import { BASE_URL } from '@/config/host';
import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from 'vant';

export interface McAxiosRequestConfig extends AxiosRequestConfig {
  isshowLoading?: boolean;
  loadingMessage?: string;
  noErrorTip?: boolean;
  domain?: string;
  returnAll?: boolean;
  extraConfig?: {
    tokenRetryCount: number; // 标记当前请求的csrf token重试次数
  };
}

const timeout = 60000; // 请求超时时间和延迟请求超时时间统一设置
let loading: any;
//正在请求的数量
let requestCount = 0;
//显示loading
const showLoading = (message: string = '加载中...') => {
  if (requestCount === 0 && !loading) {
    try {
      loading = Toast.loading({
        message,
        forbidClick: true,
        duration: 0,
      });
    } catch (e) {
      console.log(e);
    }
  }
  requestCount++;
};
//隐藏loading
const hideLoading = () => {
  if (requestCount > 0) {
    requestCount--;
  }
  if (requestCount === 0) {
    loading?.clear();
    loading = null;
  }
};

let TOKEN: string;

const config: McAxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
  isshowLoading: false,
  loadingMessage: '加载中...',
  noErrorTip: false,
  returnAll: false,
};

const instance = axios.create(config);

instance.interceptors.request.use((config: McAxiosRequestConfig) => {
  if (config.isshowLoading) {
    showLoading(config.loadingMessage);
  }
  try{
    if (!TOKEN) {
      TOKEN = 'abc'
    }
    (config.headers as Record<string, string>).Authorization = TOKEN;
    return config;
  }catch(e) {
    console.log('e', e)
  }
});

instance.interceptors.response.use(
  (res: any) => {
    
    hideLoading();
    const code = res.data['code']
    // 获取错误信息
    const msg = res.data['message']

    if (code === 113 && msg === '用户未登录') {
      return;
    }

    const success = res.data['success']
    if (code !== 200 || !success) {
      if (!(res.config as Record<string, any>).noErrorTip) {
        Toast(msg);
      }
      return Promise.reject(res.data);
    }

    return Promise.resolve((res.config as Record<string, any>)?.returnAll ? res : res.data);
  },
  async (err: any) => {
    hideLoading();
    
    const config = err?.config || {};

    if (axios.isCancel(err)) {
      return;
    }
    if (err.message === 'Network Error' && !config.noErrorTip) {
      Toast.fail('网络错误');
    }
    if (err.message.includes('timeout') && !config.noErrorTip) {
      Toast.fail('请求超时');
    }
    if (err.response) {
      const message = err.response?.data?.message || err.response?.data?.errMessage || err.response?.data?.data || '请求失败';
      !config.noErrorTip && Toast.fail(message);
    }

    return Promise.reject(err);
  }
);

export default instance;
