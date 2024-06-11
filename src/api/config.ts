import originAxios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    // 自定义参数
    accessKey?: string;
    customResponse?: boolean;
  }
  interface AxiosInstance {
    httpRequest: <T>(data: AxiosRequestConfig) => Promise<T>;
  }
}

export const axios = originAxios.create({ timeout: 60 * 1000 * 30 });

axios.interceptors.request.use(
  (res) => {
    if (res.customResponse) return res;
    res.headers = Object.assign(res.headers, {});
    return res;
  },

  (err) => {
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  (res) => {
    if (res.config.customResponse) return res;
    // 判断响应的 code 值
    const { data = null } = res;
    if (data) {
      return Promise.resolve(data);
    }
    return Promise.reject(res);
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.httpRequest = <T>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .request<unknown, AxiosResponse<T>>(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
