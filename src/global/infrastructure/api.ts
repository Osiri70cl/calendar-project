import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleApiError } from './apiError';

import { NextApiResponse } from 'next';
import { proxy } from '../constants/config';

const { baseUrl: baseURL } = proxy;

const api: AxiosInstance = axios.create({
   baseURL: baseURL,
   timeout: 15000,
   // headers: { "x-api-key": apiKey },
});

const get = async <T = any>(
   url: string,
   config?: AxiosRequestConfig,
   query?: Record<string, any> // Les données de requête (query parameters)
): Promise<T> => {
   try {
      let fullUrl = url;
      if (query) {
         const queryParams = new URLSearchParams(query);
         fullUrl += `?${queryParams.toString()}`;
      }
      const response: AxiosResponse<T> = await api.get(fullUrl, config);
      return response.data;
   } catch (error: any) {
      throw error;
   }
};

const getWithHeader = async <T = any>(
   url: string,
   config?: AxiosRequestConfig,
   query?: Record<string, any> // Les données de requête (query parameters)
): Promise<T> => {
   try {
      let fullUrl = url;
      if (query) {
         const queryParams = new URLSearchParams(query);
         fullUrl += `?${queryParams.toString()}`;
      }
      const response: any = await api.get(fullUrl, config);
      return response;
   } catch (error: any) {
      throw error;
   }
};

const post = async <T = any>(
   url: string,
   data?: any,
   config?: AxiosRequestConfig
): Promise<T> => {
   return await api.post(url, data, config);
};

const put = async <T = any>(
   url: string,
   data?: any,
   config?: AxiosRequestConfig
): Promise<T> => {
   try {
      const response: AxiosResponse<T> = await api.put(url, data, config);
      return response.data;
   } catch (error) {
      throw handleApiError(error);
   }
};

const patch = async <T = any>(
   url: string,
   data?: any,
   config?: AxiosRequestConfig
): Promise<T> => {
   try {
      return await api.patch(url, data, config);
      const response: AxiosResponse<T> = await api.patch(url, data, config);
      return response.data;
   } catch (error) {
      throw handleApiError(error);
   }
};

const remove = async <T = any>(
   url: string,
   config?: AxiosRequestConfig
): Promise<T> => {
   try {
      const response: AxiosResponse<T> = await api.delete(url, config);
      return response.data;
   } catch (error) {
      throw handleApiError(error);
   }
};

export const success =
   (res: NextApiResponse, code = 200) =>
   (data: Record<string, any> = {}) =>
      res.status(code).json({
         success: true,
         data,
      });

export const error =
   (res: NextApiResponse, code = 400) =>
   (data: Record<string, any> = {}) =>
      res.status(code).json({
         success: false,
         data,
      });

export default { get, getWithHeader, post, put, patch, remove, error, success };

export const serialize = (value: Record<string, any>) => {
   try {
      return JSON.parse(JSON.stringify(value));
   } catch (e: any) {
      throw new TypeError(e?.message || 'serialize error');
   }
};
