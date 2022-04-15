import type { AxiosError, AxiosInstance } from 'axios';
import { navigate } from '../../utils/RootNavigation';

export const interceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error?.response?.status;

      if (
        (status === 401 || status === 403) &&
        !error?.config?.headers?.retry
      ) {

        // @ts-ignore
        navigate('RootRegisterStack', {
          screen: 'Login',
        });

        return client.request(error.config);
      }

      return Promise.reject(error);
    },
  );
};
