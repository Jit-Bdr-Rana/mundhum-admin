import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken } from "../utils";
import { closeSpinner, openSpinner } from "../utils/spinner";
interface ApiResponse {
  data?: any;
  error?: any;
}

class HttpClient {
  async get(url: string, options?: AxiosRequestConfig): Promise<any> {
    const request = async () =>
      await this.axios().get<ApiResponse>(url, options);
    try {
      const { data } = await request();
      return { data };
    } catch (e: any) {
      return { error: e?.response?.data };
    }
  }

  async post(
    url: string,
    payload?: any,
    options?: AxiosRequestConfig
  ): Promise<any> {
    try {
      const { data } = await this.axios().post<ApiResponse>(
        url,
        payload,
        options
      );

      return { data };
    } catch (e: any) {
      return { error: e.response?.data ? e.response.data : e.response };
    }
  }

  async put(
    url: string,
    payload?: any,
    options?: AxiosRequestConfig
  ): Promise<any> {
    try {
      const { data } = await this.axios().put<ApiResponse>(
        url,
        payload,
        options
      );
      return { data };
    } catch (e: any) {
      return { error: e.response?.data ? e.response.data : e.response };
    }
  }

  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<any> {
    try {
      const { data } = await this.axios().delete<T>(url, options);
      return { data };
    } catch (e: any) {
      return { error: e.response?.data ? e.response.data : e.response };
    }
  }

  axios() {
    const request = axios.create({
      baseURL: process.env.BACKEND_URL || 'http://127.0.0.1:8000/api',
    });

    request.interceptors.request.use(
      function (config) {
        config.headers = {
          Authorization: `Bearer ${getAccessToken()}`,
        };
        openSpinner();
        return config;
      },
      function (error) {
        closeSpinner();
        return Promise.reject(error);
      }
    );

    request.interceptors.response.use(

      function (response) {
        closeSpinner();
        console.log(response)
        if (response?.status == 401) {
          message.success('session expired')
          window.location.href = '/'
        }
        return response;
      },
      function (error) {
        console.log(error.response)
        closeSpinner();
        if (error?.response?.status == 401 && error?.config?.url !== "login") {
          message.success('session expired')
          window.location.href = '/'
        }
        return Promise.reject(error);
      }
    );

    return request;
  }

  public refreshToken = async () => {
    try {
      const { data } = await httpOnly().post<ApiResponse>("/token_refresh ", {
        refresh: getRefreshToken(),
      });
      return { data };
    } catch (e: any) {
      return { error: e?.response?.data };
    }
  };
}

const httpClient = (): HttpClient => {
  return new HttpClient();
};
const httpOnly = (): AxiosInstance => {
  const plainAxios: AxiosInstance = axios.create({
    // baseURL: "http://localhost:2200/",
    baseURL: process.env.BACKEND_URL || 'http://127.0.0.1:8000/api',
    timeout: 1000,
  });
  plainAxios.interceptors.request.use(
    (res) => {
      openSpinner();
      return res;
    },
    (err) => {
      closeSpinner();
      return err;
    }
  );
  plainAxios.interceptors.response.use(
    (res) => {
      closeSpinner();
      return res;
    },
    (err) => {
      closeSpinner();
      return err;
    }
  );

  return plainAxios;
};

export { httpOnly, httpClient };
