import React, { createContext, ReactNode, useState } from 'react';

import { signInRequest, signUpRequest } from '../services/auth';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigate } from '../utils/RootNavigation';

import { LoginInput, RegisterInformation } from '../services/auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signUp: (registerInformation: RegisterInformation) => void;
  signIn: (loginInformation: LoginInput) => void;
  username: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState('');

  async function signIn({ email, password }: LoginInput) {
    const { token, message, name } = await signInRequest({
      email,
      password,
    });

    if (message === 'User Not Found') {
      throw Error('User Not Found');
    }

    if (message === 'Validation failed') {
      throw Error('Validation failed');
    }

    await AsyncStorage.setItem('@LojaAplicativo:User', token);

    setUsername(name);

    // @ts-ignore
    navigate('RootProductDrawerNavigator');

    // @ts-ignore
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  async function signUp({ name, phone, email, password }: RegisterInformation) {
    const { message } = await signUpRequest({
      name,
      phone,
      email,
      password,
    });

    if (message === 'Validation failed') {
      throw Error('Validation failed');
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, username }}>
      {children}
    </AuthContext.Provider>
  );
}
