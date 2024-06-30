import colors from '../../theme/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1,
  },
  eye: {
    width: 24,
    height: 24,
    marginHorizontal: 16,
  },
  arrow: {
    width: 20,
    height: 20,
    marginHorizontal: 16,
    transform: [{rotate: '270deg'}],
  },
  placeholder: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1,
    color: colors.lightGrey,
  },
  modalWarpper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modelContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  headerTitle: {
    marginBottom: 16,
    fontSize: 16,
  },
  optionText: {
    color: colors.black,
    paddingVertical: 4,
  },
  selectedOption: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
