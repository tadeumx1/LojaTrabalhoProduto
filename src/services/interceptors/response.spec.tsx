import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import interceptor from './';
import { getCredentionsFromStorage } from './response';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => 'async-storage-mocked'),
  setItem: jest.fn(),
}));

jest.mock('@pub-libs/aws-oaf-auth-lib', () => ({
  RefreshToken: class RefreshToken {
    refreshToken() {
      return { IdToken: 'id-token-moccked' };
    }
  },
}));

describe('bff response interceptor', () => {
  it('should call refresher to get a new token and set it in the storage', async () => {
    const client = axios.create();
    client.request = jest.fn();

    interceptor.response(client);

    await client.interceptors.response.handlers[0].rejected({
      config: {
        headers: {
          retry: false,
        },
      },
      response: {
        status: 401,
        data: {},
      },
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'midway_civ_id_token',
      'id-token-moccked'
    );
    expect(client.request).toHaveBeenCalledWith({
      headers: { 'retry': true, 'x-app-token': 'id-token-moccked' },
    });
  });

  it('should not get a new token', async () => {
    const client = axios.create();
    client.request = jest.fn();

    interceptor.response(client);

    try {
      await client.interceptors.response.handlers[0].rejected({
        config: {
          headers: {
            retry: true,
          },
        },
        response: {
          status: 403,
          data: {},
        },
      });
    } catch (error) {
      expect(error).toEqual({
        config: { headers: { retry: true } },
        response: { status: 403, data: {} },
      });
      expect(client.request).toHaveBeenCalledTimes(0);
    }
  });

  it('should be success and it does not call refresh token', async () => {
    const client = axios.create();
    client.request = jest.fn();

    interceptor.response(client);

    const response = await client.interceptors.response.handlers[0].fulfilled({
      config: {
        headers: {},
      },
      response: {
        status: 200,
        data: {},
      },
    });

    expect(response).toEqual({
      config: { headers: {} },
      response: { data: {}, status: 200 },
    });
  });

  it('should validate return on the getCredentionsFromStorage function', async () => {
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockImplementation(() => Promise.resolve('async-storage-mocked'));

    expect(await getCredentionsFromStorage()).toEqual({
      applicationId: 'async-storage-mocked',
      refreshToken: 'async-storage-mocked',
      xApiKey: 'async-storage-mocked',
      oafBaseUrl: 'async-storage-mocked',
    });

    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockImplementation(() => Promise.resolve(null));

    expect(await getCredentionsFromStorage()).toEqual({
      applicationId: '',
      refreshToken: '',
      xApiKey: '',
      oafBaseUrl: '',
    });
  });
});
