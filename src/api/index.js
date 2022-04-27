import axios from 'axios';
import { setInterceptors } from './interceptors';

function createWithAuth(options) {
  // console.log(process.env.NODE_ENV);
  const baseUrl =
    process.env.NODE_ENV !== 'local'
      ? `${process.env.VUE_APP_API_URL}/b2c/api/`
      : '/b2c/api/';
  const instance = axios.create(
    Object.assign(
      {
        baseURL: baseUrl,
        timeout: 0,
        responseEncoding: 'utf8',
      },
      {
        ...options,
      }
    )
  );
  setInterceptors(instance);
  return instance;
}

export const instance = createWithAuth();
