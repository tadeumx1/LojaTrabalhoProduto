import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import interceptor from './';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => 'async-storage-mocked'),
}));

describe('bff request interceptor', () => {
  it('should get token and key from storage to set in headers', async () => {
    const request = {
      headers: {},
      data: {},
    };

    const client = axios.create();
    interceptor.request(client);
    const config = await client.interceptors.request.handlers[0].fulfilled(
      request
    );

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      'midway_civ_id_token'
    );
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('midway_civ_api_key');
    expect(config).toEqual({
      data: {},
      headers: {
        'x-api-key': 'encrypted-storage-mocked',
        'x-app-token': 'encrypted-storage-mocked',
        'x-device-id': '42143e95-de92-4cc2-abba-37b49aa69f1c',
      },
    });
  });

  it('should not get token because there is already a token in the header', async () => {
    const request = {
      headers: {
        'x-app-token': 'x-app-token-mocked',
      },
      data: {},
    };

    const client = axios.create();
    interceptor.request(client);
    const config = await client.interceptors.request.handlers[0].fulfilled(
      request
    );

    expect(config).toEqual({
      data: {},
      headers: { 'x-app-token': 'x-app-token-mocked' },
    });
  });
});
