import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './assets/colors';

import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Favorites } from './pages/Favorites';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';

import CustomDrawer from './components/CustomDrawer';

import {
  RootRegisterStack,
  RootParamListStack,
  RootProductDrawerNavigator,
} from './protocols/types';

const StackNavigatorRegister = createStackNavigator<RootRegisterStack>();

const DrawerNavigatorProduct =
  createDrawerNavigator<RootProductDrawerNavigator>();

const Stack = createStackNavigator<RootParamListStack>();

const StackNavigatorRegisterScreen = () => {
  return (
    <StackNavigatorRegister.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <StackNavigatorRegister.Screen name="Login" component={Login} />
      <StackNavigatorRegister.Screen name="Register" component={SignUp} />
    </StackNavigatorRegister.Navigator>
  );
};

const StackProductFavorites = () => {
  return (
    <DrawerNavigatorProduct.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#0047AB',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      initialRouteName="Product"
    >
      <DrawerNavigatorProduct.Screen
        options={{ title: 'Produtos' }}
        name="Product"
        component={ProductList}
      />
      <DrawerNavigatorProduct.Screen
        options={{ title: 'Favoritos' }}
        name="Favorites"
        component={Favorites}
      />
    </DrawerNavigatorProduct.Navigator>
  );
};

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      await handleGetUserStorage();
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetUserStorage = async () => {
    setLoading(true);

    try {
      const user = await AsyncStorage.getItem('@LojaAplicativo:User');

      if (user) {
        setAuthenticated(true);
      }
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.BLACK}
        style={styles.loading}
      />
    );
  }

  if (error) {
    Alert.alert(
      'Atenção',
      'Não foi possível carregar as informações',
      [
        {
          text: 'TENTAR NOVAMENTE',
          onPress: async () => {
            await handleGetUserStorage();
          },
        },
      ],
      { cancelable: false },
    );

    return <View />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        authenticated ? 'RootProductDrawerNavigator' : 'RootRegisterStack'
      }
    >
      <Stack.Screen
        name="RootRegisterStack"
        component={StackNavigatorRegisterScreen}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen
        name="RootProductDrawerNavigator"
        component={StackProductFavorites}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Routes;
