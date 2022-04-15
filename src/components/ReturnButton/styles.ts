import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

export default StyleSheet.create<any>({
  buttonWrapper: {
    marginLeft: 10,
    marginTop: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  buttonIconLight: {
    width: 24,
    height: 24,
    tintColor: colors.WHITE,
  },
});
