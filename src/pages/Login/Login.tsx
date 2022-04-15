import React, { useState, useContext } from 'react';
import { StatusBar, Alert, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamListStack } from '../../protocols/types';

import * as yup from 'yup';
import { ValidationError } from 'yup';

import {
  Container,
  Title,
  TextInformation,
  ErrorTitle,
  Card,
  Form,
  Input,
  TextInformationRegister,
  Button,
  ButtonText,
} from './styles';

interface ValidateInputType {
  username: string;
  password: string;
}

type LoginScreenProp = StackNavigationProp<
  RootParamListStack,
  'RootRegisterStack'
>;

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<LoginScreenProp>();

  const { signIn } = useContext(AuthContext);

  const signInSchema = yup.object().shape({
    username: yup
      .string()
      .email('Por favor preencha um Email corretamente')
      .required('Preencha um email'),
    password: yup
      .string()
      .required('Digite uma senha')
      .min(5, 'A senha é muito curta - Deve ter no mínimo 5 caracteres'),
  });

  const validateInput = async ({ username, password }: ValidateInputType) => {
    try {
      await signInSchema.validate({ username, password });
      setVisible(false);

      return true;
    } catch (err) {
      if (err instanceof ValidationError) {
        if (err.name == 'ValidationError') {
          const error = err.errors[0];
          setVisible(true);
          setErrorMessage(error);
        } else {
          Alert.alert(
            'Ocorreu um erro na validação dos campos, tente novamente',
          );
        }
      }

      return false;
    }
  };

  const handleNavigateRegister = () => {
    //@ts-ignore
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    const validate = await validateInput({ username, password });

    const email = username;

    setLoading(true);

    try {
      if (validate) {
        signIn({ email, password });
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User Not Found') {
          setVisible(true);
          setErrorMessage('Usuário não encontrado');
        } else if (err.message === 'Validation failed') {
          setVisible(true);
          setErrorMessage('Preencha os campos corretamente');
        } else {
          Alert.alert('Erro ao fazer login tente novamente mais tarde');
        }
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Card>
        <Title>Login</Title>
        <TextInformation>
          Para continuar, precisamos que você informe seus dados para entrar no
          aplicativo
        </TextInformation>

        {visible && <ErrorTitle>{errorMessage}</ErrorTitle>}

        <Form>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={username}
            onChangeText={(username: string) => setUsername(username)}
          />

          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite sua senha"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            secureTextEntry={true}
            value={password}
            onChangeText={(password: string) => setPassword(password)}
          />

          <Button disabled={loading} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <ButtonText>Continuar</ButtonText>
            )}
          </Button>
          <TextInformation>
            Não tem uma conta ?{' '}
            <TextInformationRegister onPress={handleNavigateRegister}>
              Faça seu cadastro
            </TextInformationRegister>
          </TextInformation>
        </Form>
      </Card>
    </Container>
  );
}
