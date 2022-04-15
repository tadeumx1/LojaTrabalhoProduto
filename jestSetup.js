/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import mock from 'react-native-permissions/mock';

jest.mock('react-native-permissions', () => {
  return mock;
});

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
