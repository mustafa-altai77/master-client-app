import colors from '../../theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.blue,
    justifyContent: 'space-between',
  },
  masterBackground: {
    backgroundColor: colors.green,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleMaster: {
    color: colors.white,
  },
  deviceName: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
