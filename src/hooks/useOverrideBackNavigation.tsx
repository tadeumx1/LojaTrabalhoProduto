import React, { useCallback, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/colors';

export const useOverrideBackNavigation = (
  title: string,
  onGoBack?: () => void,
  navigate?: () => void,
) => {
  const navigator = useNavigation();

  const handleOnPress = useCallback(() => {
    if (navigate) {
      navigate();
    } else {
      navigator.goBack();
    }

    onGoBack && onGoBack();
  }, [navigate, navigator, onGoBack]);

  useLayoutEffect(() => {
    navigator.setOptions({
      title,
      headerShown: true
    });
  }, [handleOnPress, navigator]);
};
