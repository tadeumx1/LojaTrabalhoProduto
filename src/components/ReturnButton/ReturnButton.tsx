import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
};

export const ReturnButton: React.FC<Props> = (props: Props) => {
  const { onPress } = props;

  return (
    <TouchableOpacity
      testID='return-button'
      accessible={true}
      accessibilityRole='button'
      accessibilityLabel='Voltar'
      accessibilityHint='Navega para tela anterior'
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <MaterialIcons name='arrow-back' size={30} />
    </TouchableOpacity>
  );
};
