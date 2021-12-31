import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { AuthStorageService } from '../auth/auth-storage.service';

const instance = axios.create({
  headers: {
    'content-type': 'application/json',
  },
});

export const requestWithJWT = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
): Promise<AxiosResponse | undefined> => {
  try {
    if (process.env.NODE_ENV === 'development')
      console.log('network call made:', method, url, data);
    const token = AuthStorageService.getAccessToken();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    if (method === 'get' || method === 'delete') {
      return await instance[method](url, config);
    }
    return await instance[method](url, data, config);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { message, status } = (e as AxiosError).response?.data;
      toast.error(`${status}: ${message}`);
    } else {
      toast.error(
        '500: An unknown error has occurred while processing your request. Please try again later.',
      );
    }
  }
};
