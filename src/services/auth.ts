import api from './api';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInformation {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export async function signInRequest({ email, password }: LoginInput) {
  const requestBody = {
    email,
    password,
  };

  const { data } = await api.post('/storeProducts/login', requestBody);

  return data;
}

export async function signUpRequest({
  name,
  phone,
  email,
  password,
}: RegisterInformation) {
  const requestBody = {
    name,
    phone,
    email,
    password,
  };

  const { data } = await api.put('/storeProducts/signup', requestBody);

  return data;
}
