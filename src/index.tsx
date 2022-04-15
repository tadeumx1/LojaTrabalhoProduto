import React from 'react';

import './config/ReactotronConfig';

import 'react-native-gesture-handler';

import { AuthProvider } from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/RootNavigation';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </NavigationContainer>
);

export default App;
