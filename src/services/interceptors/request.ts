import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosInstance } from 'axios';

export const interceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(async (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const token = await AsyncStorage.getItem('@LojaAplicativo:User');

    if (!config.headers['Authorization'] && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });
};
