import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import convertIPv6toIPv4 from '../../utils/convertIP';

const ConnectedClients = item => {
  return (
    <TouchableOpacity key={item.id}>
      <View style={styles.clientItem}>
        <Text style={styles.deviceName}>Decive Name: {item.deviceName}</Text>
        <Text> ID: {item.id}</Text>
        <Text> IP: {convertIPv6toIPv4(convertIPv6toIPv4(item.ip))}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ConnectedClients;
