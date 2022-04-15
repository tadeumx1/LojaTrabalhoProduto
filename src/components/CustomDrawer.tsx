import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { RootParamListStack } from '../protocols/types';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../contexts/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

type CustomDrawerScreenProp = StackNavigationProp<
  RootParamListStack,
  'RootRegisterStack'
>;

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<CustomDrawerScreenProp>();

  const { username } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@LojaAplicativo:User');

    navigation.navigate('RootRegisterStack');
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#fff' }}
      >
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{ padding: 20 }}
        >
          <Image
            source={require('../assets/images/user-profile.png')}
            resizeMode='center'
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}
          >
            {username}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Compartilhar
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Sair
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
