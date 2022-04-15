import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, Platform, ActivityIndicator } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { ReturnButton } from '../../components/ReturnButton'

import { useNavigation } from '@react-navigation/native';

import { PERMISSIONS, request, openSettings } from 'react-native-permissions';

import Geolocation from 'react-native-geolocation-service';

import {
  Container,
  TitleProduct,
  TextInformation,
  ProductContainer,
  ProductImage,
  ProductTitleContainer,
  ErrorTitle,
  Card,
  Button,
  ButtonText,
} from './styles';

interface Props {
  route: {
    params: {
      productId: number;
    };
  };
}

interface ProductStores {
  _id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
}

interface LatitudeLongitudePosition {
  latitude: number;
  longitude: number;
}

interface Product {
  _id: number;
  name: string;
  price: string;
  favorite: boolean;
  stores: ProductStores[];
  createdDate: string;
  updatedDate: string;
}

export const ProductDetail: React.FC<Props> = (props: Props) => {
  const [loadingProductFavorite, setLoadingProductFavorite] = useState(false);
  const [productButtonText, setProductButtonText] = useState('');
  const [latitudeLongitude, setLatitudeLongitude] =
    useState<LatitudeLongitudePosition>({
      latitude: -23.533773,
      longitude: -46.62529,
    });
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const [product, setProduct] = useState<Product>();

  const LOCATION_PERMISSION =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const handleGetProduct = async () => {
    const { productId } = props.route.params;

    try {
      const { data } = await api.get(`/storeProducts/product/${productId}`);

      setProduct(data.product);
    } catch (err) {
      setErrorMessage('Ocorreu um erro, tente novamente mais tarde');
    }
  };


  const handleBackNavigation = () => {
    navigation.goBack();
  }

  useEffect(() => {
    async function handleProduct() {
      await handleGetProduct();

      const permissionValue = await request(LOCATION_PERMISSION);

      if (permissionValue == 'granted') {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitudeLongitude({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => console.log('Erro Geolocation', error),
          {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 1000,
          },
        );
      } else {
        await openSettings();
      }
    }

    handleProduct();
  }, []);

  const handleProductFavorite = async () => {
    const productId = product?._id;

    const requestBody = {
      productID: productId,
    };

    setLoadingProductFavorite(true);

    try {
      await api.post('/storeProducts/manageFavorite', requestBody);

      if (!product?.favorite) {
        Alert.alert('Mensagem', 'O produto foi marcado como favorito');
      } else {
        Alert.alert('Mensagem', 'O produto foi desmarcado como favorito');
      }

      await handleGetProduct();
    } catch (err) {
      Alert.alert('Mensagem', 'Ocorreu um erro ' + err);
    }

    setLoadingProductFavorite(false);
  };

  useEffect(() => {
    if (!product?.favorite) {
      setProductButtonText('Marcar Favorito');
    } else {
      setProductButtonText('Remover Favorito');
    }
  }, [product]);

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

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Card>
        <ReturnButton onPress={handleBackNavigation} />
        <ProductContainer>
          <ProductImage
            source={{
              // uri: 'https://www.pontofrio-imagens.com.br/tv-video/DVDeBluRayPlayers/DVDPlayer/3439272/244380798/dvd-player-lg-dp132-com-entrada-usb-3439272.jpg',
              uri: 'https://a-static.mlcdn.com.br/1500x1500/dvd-player-lg-dp132-usb/lojastaqi/157639/28fcc4ea9b34e70c3c4e3871d29c52de.jpg',
            }}
          />
        </ProductContainer>

        <ProductTitleContainer>
          <TitleProduct>{product?.name}</TitleProduct>
          {product?.favorite && <MaterialIcons name="star" size={20} />}
        </ProductTitleContainer>
        <TextInformation>R$ {product?.price}</TextInformation>
        <TextInformation>Descrição produto</TextInformation>
        <Button
          disabled={loadingProductFavorite}
          onPress={handleProductFavorite}
        >
          <ButtonText>{productButtonText}</ButtonText>
        </Button>

        <MapView
          style={{ height: '35%', width: '100%', marginTop: 10 }}
          region={{
            latitude: latitudeLongitude.latitude,
            longitude: latitudeLongitude.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled={true}
          toolbarEnabled={true}
          zoomControlEnabled={true}
        >
          {product?.stores.map((storeProduct, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(storeProduct.latitude),
                longitude: parseFloat(storeProduct.longitude),
              }}
              title="Loja"
              description="Descrição da loja"
            />
          ))}
        </MapView>
      </Card>
    </Container>
  );
};
