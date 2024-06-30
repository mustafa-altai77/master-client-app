import React from 'react';
import {View, StatusBar, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const StatusBarCustom = () => {
  const isAndroid = Platform.OS === 'android';

  return (
    <SafeAreaView
      style={isAndroid ? styles.androidSafeArea : styles.iosSafeArea}>
      <StatusBar
        backgroundColor={isAndroid ? 'blue' : 'black'}
        barStyle={isAndroid ? 'light-content' : 'dark-content'}
      />
      {!isAndroid && <View style={styles.iosStatusBarBackground} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    backgroundColor: 'blue',
  },
  iosSafeArea: {
    backgroundColor: 'black',
    flex: 0,
  },
  iosStatusBarBackground: {
    height: StatusBar.currentHeight || 20,
    backgroundColor: 'black',
  },
});

export default StatusBarCustom;
