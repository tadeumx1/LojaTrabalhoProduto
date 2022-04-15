import React, { useState, useContext } from 'react';
import { StatusBar, Alert, ActivityIndicator, ScrollView } from 'react-native';

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
  ContainerInput,
  ErrorTitle,
  Card,
  Form,
  TitleInput,
  Input,
  TextInformationRegister,
  Button,
  ButtonText,
} from './styles';

interface ValidateInputType {
  nameUser: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

type LoginScreenProp = StackNavigationProp<
  RootParamListStack,
  'RootRegisterStack'
>;

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<LoginScreenProp>();

  const { signUp } = useContext(AuthContext);

  const signUpSchema = yup.object().shape({
    passwordConfirm: yup
      .string()
      .required('Digite a senha para confirmar')
      .min(5, 'A senha é muito curta - Deve ter no mínimo 5 caracteres'),
    password: yup
      .string()
      .required('Digite uma senha')
      .min(5, 'A senha é muito curta - Deve ter no mínimo 5 caracteres'),
    phone: yup
      .string()
      .matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))/,
        {
          message: 'Por favor preencha um celular correto',
          excludeEmptyString: false,
        },
      ),
    email: yup
      .string()
      .email('Por favor preencha um Email corretamente')
      .required('Preencha um email'),
    lastName: yup
      .string()
      .required('Preencha o sobrenome')
      .min(4, 'O nome é muito curto - Deve ter no mínimo 4 caracteres'),
    nameUser: yup
      .string()
      .required('Preencha o nome')
      .min(3, 'O nome é muito curto - Deve ter no mínimo 3 caracteres'),
  });

  const validateInput = async (dataInput: ValidateInputType) => {
    try {
      const { password, passwordConfirm } = dataInput;

      await signUpSchema.validate(dataInput);

      if (password !== passwordConfirm) {
        setVisible(true);
        setErrorMessage('As senhas estão diferentes, digite a mesma senha');

        return false;
      }

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

  const handleNavigateLogin = () => {
    // @ts-ignore
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    setLoading(true);

    const nameUser = username;
    const email = userEmail;

    const validate = await validateInput({
      nameUser,
      lastName,
      phone,
      email,
      password,
      passwordConfirm,
    });

    const name = nameUser + ' ' + lastName;

    try {
      if (validate) {
        await signUp({
          name,
          phone,
          email,
          password,
        });

        handleNavigateLogin();
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Validation failed') {
          setVisible(true);
          setErrorMessage('Preencha os campos corretamente');
        } else {
          Alert.alert('Erro ao fazer o cadastro tente novamente mais tarde');
        }
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Card>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 30, paddingHorizontal: 10 }}
        >
          <Title>Cadastro</Title>
          <TextInformation>
            Para continuar, precisamos que você informe seus dados para fazer o
            cadastro no aplicativo
          </TextInformation>

          {visible && <ErrorTitle>{errorMessage}</ErrorTitle>}

          <Form>
            <ContainerInput>
              <TitleInput>Nome</TitleInput>
              <Input
                autoCorrect={false}
                placeholder="Digite seu nome"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={username}
                onChangeText={(username: string) => setUsername(username)}
              />
            </ContainerInput>

            <ContainerInput>
              <TitleInput>Sobrenome</TitleInput>
              <Input
                autoCorrect={false}
                placeholder="Digite seu sobrenome"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={lastName}
                onChangeText={(lastName: string) => setLastName(lastName)}
              />
            </ContainerInput>

            <ContainerInput>
              <TitleInput>Email</TitleInput>
              <Input
                autoCorrect={false}
                placeholder="Digite seu email"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={userEmail}
                onChangeText={(userEmailValue: string) =>
                  setUserEmail(userEmailValue)
                }
              />
            </ContainerInput>

            <ContainerInput>
              <TitleInput>Telefone</TitleInput>
              <Input
                autoCorrect={false}
                placeholder="Digite seu telefone"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                value={phone}
                onChangeText={(phone: string) => setPhone(phone)}
              />
            </ContainerInput>

            <ContainerInput>
              <TitleInput>Senha</TitleInput>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite sua senha"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                secureTextEntry={true}
                value={password}
                onChangeText={(password: string) => setPassword(password)}
              />
            </ContainerInput>

            <ContainerInput>
              <TitleInput>Confirme a senha</TitleInput>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Confirme a senha"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                secureTextEntry={true}
                value={passwordConfirm}
                onChangeText={(confirmPassword: string) =>
                  setPasswordConfirm(confirmPassword)
                }
              />
            </ContainerInput>

            <Button disabled={loading} onPress={handleRegister}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <ButtonText>Continuar</ButtonText>
              )}
            </Button>
            <TextInformation>
              Já possui uma conta ?{' '}
              <TextInformationRegister onPress={handleNavigateLogin}>
                Entre aqui
              </TextInformationRegister>
            </TextInformation>
          </Form>
        </ScrollView>
      </Card>
    </Container>
  );
};
