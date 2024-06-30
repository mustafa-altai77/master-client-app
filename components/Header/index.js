import React from 'react';
import {Text, View, Switch} from 'react-native';
import {styles} from './styles';

const Header = ({title, isMaster, setIsMaster, deviceName}) => {
  const handleSwitchToggle = value => {
    setIsMaster(value);
  };

  return (
    <View style={[styles.mainContainer, isMaster && styles.masterBackground]}>
      <View style={styles.container}>
        <Text style={[styles.title, isMaster && styles.titleMaster]}>
          {' '}
          Mode: {title}
        </Text>
      </View>
      <Text style={[styles.deviceName, isMaster && styles.titleMaster]}>
        {deviceName}
      </Text>
      <Switch value={isMaster} onValueChange={handleSwitchToggle} />
    </View>
  );
};
export default React.memo(Header);
