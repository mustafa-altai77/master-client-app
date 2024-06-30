import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 0,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default styles;
