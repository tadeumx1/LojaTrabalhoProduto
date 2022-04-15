import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #444a5a;
  padding: 20px;
  justify-content: center;
  align-items: stretch;
`;

export const TitleProduct = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;
`;

export const TextInformation = styled.Text`
  margin-top: 10px;
  font-size: 14px;
  line-height: 21px;
`;

export const ProductImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 150px;
  width: 150px;
`;

export const ErrorTitle = styled.Text`
  text-align: center;
  color: #000;
  margin-top: 10px;
`;

export const ProductContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ProductTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Card = styled.View`
  background-color: #ffffff;
  padding: 30px 10px;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  elevation: 1;
`;

export const Button = styled.TouchableOpacity`
  background-color: #020a29;
  border-radius: 3px;
  height: 44px;
  padding: 0px 20px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
`;
