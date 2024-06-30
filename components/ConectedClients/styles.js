import colors from '../../theme/colors';
import {StyleSheet} from 'react-native';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  clientItem: {
    justifyContent: 'space-between',
    backgroundColor: colors.lightGrey,
    margin: 4,
    padding: 5,
    borderRadius: 5,
  },
  deviceName: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.bold,
  },
});
