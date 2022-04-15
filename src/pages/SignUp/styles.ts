import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #444a5a;
  padding: 20px;
  justify-content: center;
  align-items: stretch;
`;

export const Title = styled.Text`
  text-align: center;
  color: #000;
  font-size: 24px;
  font-weight: bold;
`;

export const TextInformation = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  line-height: 21px;
`;

export const TitleInput = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  margin: 5px 0px;
  line-height: 21px;
`;

export const TextInformationRegister = styled.Text`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  text-decoration: underline;
  line-height: 21px;
`;

export const ContainerInput = styled.View`
  align-items: flex-start;
`;

export const ErrorTitle = styled.Text`
  color: #e37a7a;
  text-align: center;
  margin-top: 10px;
`;

export const Card = styled.View`
  flex: 1;
  background-color: #ffffff;
  // padding: 30px 10px;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  elevation: 1;
`;

export const Form = styled.View`
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  background-color: #ffffff;
  border-radius: 3px;
  height: 44px;
  border: 0.5px solid #808080;
  padding: 0px 20px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #020a29;
  border-radius: 3px;
  height: 44px;
  padding: 0px 20px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
`;
