import {StyleSheet} from 'react-native';
import colors from './theme/colors';
import fonts from './theme/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  button: {
    marginVertical: 20,
    backgroundColor: 'red',
  },
  rowMessage: {
    flex: 1,
  },

  receviedDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  receivedData: {
    marginTop: 20,
    fontSize: fonts.size.font16,
  },

  connectedClients: {
    flex: 1,
  },
  noClients: {
    marginTop: 10,
  },
  containerClienet: {
    padding: 10,
    backgroundColor: colors.lightGrey,
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    tintColor: colors.blue,
  },

  clearData: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    tintColor: colors.red,
  },
  containerMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContiner: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  deviceName: {
    fontSize: fonts.size.font12,
    fontWeight: fonts.weight.bold,
  },
  item: {
    color: colors.blue,
    marginHorizontal: 15,
    fontSize: fonts.size.font14,
  },
  itemData: {
    marginTop: 10,
    color: colors.black,
    fontWeight: fonts.weight.semibold,
  },
});
