import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #444a5a;
  padding: 20px;
  justify-content: center;
  align-items: stretch;
`;

export const ContainerLoading = styled.View`
  align-self: center;
  margin: 0px 20px;
`;

export const ErrorTitle = styled.Text`
  color: #e37a7a;
  text-align: center;
  margin-top: 10px;
`;

export const ListItem = styled.TouchableOpacity`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  elevation: 3;
  align-items: center;
  // border: 1px solid #000;
  margin: 0 10px 20px;
`;

export const ProductImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const ProductInfoContainer = styled.View`
  // align-self: flex-start;
`;

export const ProductTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ProductTitle = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const ProductPrice = styled.Text`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

export const ProductDescription = styled.Text`
  margin-top: 10px;
  color: #333;
`;

export const Card = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 30px 10px;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  elevation: 1;
`;
