import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, Text, ActivityIndicator } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamListStack } from '../../protocols/types';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  ErrorTitle,
  Card,
  ListItem,
  ProductImage,
  ProductInfoContainer,
  ProductTitleContainer,
  ProductTitle,
  ProductPrice,
  ProductDescription,
} from './styles';

type ProductListcreenProp = StackNavigationProp<
  RootParamListStack,
  'RootProductDrawerNavigator'
>;

interface Product {
  _id: number;
  name: string;
  price: string;
  favorite: true;
}

export const Favorites = () => {
  const [data, setData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<ProductListcreenProp>();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadItems() {
      await loadProducts();
    }

    if (isFocused) {
      loadItems();
    }
  }, [isFocused]);

  const loadProducts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await api.get('/storeProducts/getFavProducts');

      setData(response.data.products);
    } catch (err) {
      setErrorMessage('Ocorreu um erro, tente novamente mais tarde');
    }

    setLoading(false);
  };

  const handleNavigateProductDetail = (product: Product) => {
    // @ts-ignore
    navigation.navigate('ProductDetail', { productId: product._id });
  };

  if (errorMessage) {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Card>
          <ErrorTitle>{errorMessage}</ErrorTitle>
        </Card>
      </Container>
    );
  }

  // @ts-ignore
  const renderItem = ({ item }) => (
    <ListItem onPress={() => handleNavigateProductDetail(item)}>
      <ProductImage
        source={{
          // uri: 'https://www.pontofrio-imagens.com.br/tv-video/DVDeBluRayPlayers/DVDPlayer/3439272/244380798/dvd-player-lg-dp132-com-entrada-usb-3439272.jpg',
          uri: 'https://a-static.mlcdn.com.br/1500x1500/dvd-player-lg-dp132-usb/lojastaqi/157639/28fcc4ea9b34e70c3c4e3871d29c52de.jpg',
        }}
      />
      <ProductInfoContainer>
        <ProductTitleContainer>
          <ProductTitle>
            {item.name.length > 30
              ? `${item.name.substring(0, 30)} ...`
              : item.name}
          </ProductTitle>
          {item.favorite && (
            <MaterialIcons style={{ marginTop: 15 }} name="star" size={20} />
          )}
        </ProductTitleContainer>
        <ProductPrice>R$ {item.price}</ProductPrice>
        <ProductDescription>Descrição produto</ProductDescription>
      </ProductInfoContainer>
    </ListItem>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Card>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => String(item._id)}
          testID="list"
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </Card>
    </Container>
  );
};
