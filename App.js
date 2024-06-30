import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import Input from './components/input';
import Button from './components/Button';
import io from 'socket.io-client';
import {NetworkInfo} from 'react-native-network-info';
import Header from './components/Header';
import {styles} from './styles';
import DeviceInfo from 'react-native-device-info';
import ConnectedClients from './components/ConectedClients';
import {SOCKET_IP} from '@env';

const App = () => {
  const [isMaster, setIsMaster] = useState(false);

  const [connected, setConnected] = useState(false);
  const [data, setData] = useState(null);
  const [receivedData, setReceivedData] = useState([]);
  const [connectedClients, setConnectedClients] = useState([]);

  const [localIp, setLocalIp] = useState('');
  const [socket, setSocket] = useState(null);
  const [masterIp, setMasterIp] = useState(localIp);
  const [master, setMaster] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    const fetchDeviceName = async () => {
      const name = await DeviceInfo.getModel();
      setDeviceName(name);
    };
    fetchDeviceName();

    NetworkInfo.getIPAddress().then(ip => {
      setLocalIp(ip);
      setMasterIp(ip);
      console.log('Local IP Address:', ip);
    });
    const newSocket = io(SOCKET_IP);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('registerDevice', deviceName);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
      setMasterIp('');
      if (isMaster) {
        setConnectedClients([]);
      }
    });
    newSocket.on('receiveData', message => {
      console.log('Raw data received:', message);
      if (
        message != null &&
        typeof message.data === 'string' &&
        message.data !== ''
      ) {
        console.log('Valid data received:', message.data);
        setReceivedData(prev => [...prev, message]);
      } else {
        console.warn('Received invalid data', message);
      }
    });

    newSocket.on('connectedToMaster', masterInfo => {
      console.log('Connected to master:', masterInfo);
      setConnected(true);
      setMaster(masterInfo);
    });

    newSocket.on('masterDisconnected', () => {
      console.log('Master disconnected');
      setConnected(false);
      setConnectedClients([]);
      setMaster(null);
      Alert.alert('Master Disconnected', '');
    });

    newSocket.on('clientConnected', clientInfo => {
      console.log('New client connected:', clientInfo);

      const clientExists = connectedClients.some(
        client => client.id === clientInfo.id,
      );

      if (!clientExists) {
        setConnectedClients(prevClients => {
          return [...prevClients, clientInfo];
        });
      } else {
        console.log(
          `Client ${clientInfo.id} already exists in connectedClients.`,
        );
      }
    });

    newSocket.on('clientDisconnected', clientId => {
      console.log('Client disconnected:', clientId);
      setConnectedClients(prevClients =>
        prevClients.filter(client => client.id !== clientId),
      );
    });

    newSocket.on('masterConnected', clientInfo => {
      console.log('Master connected:', clientInfo);
      setMaster(clientInfo);
    });

    newSocket.on('forwardData', ({data, senderId, deviceName}) => {
      if (isMaster) {
        setReceivedData(prev => [...prev, {data, senderId, deviceName}]);
        console.log('data:', data);
      }
    });

    return () => newSocket.close();
  }, [isMaster]);

  const connect = () => {
    if (isMaster) {
      socket.emit('setRole', 'master', localIp, deviceName);
      setConnected(true);
    } else {
      if (masterIp) {
        console.log(masterIp);
        socket.emit('setRole', 'client', masterIp, deviceName);
      } else {
        Alert.alert('Disconnected', 'Please enter a master IP address');
        setConnected(false);
      }
    }
  };

  const disconnect = () => {
    socket.disconnect();
    setConnected(false);
    setMasterIp('');
  };

  const sendMessage = () => {
    if (data && connected) {
      const message = {
        data,
        deviceName,
      };

      socket.emit('sendData', message);
      // Clear input field after sending
      setData('');
    } else {
      console.warn('Please enter a message and connect to the server.');
    }
  };

  const forwardData = item => {
    if (!isMaster) {
      return;
    }
    const dataToForward = {
      data: item.data,
      messageSender: item.senderId,
      deviceName: deviceName,
    };

    // Emit forwardData event to the server
    socket.emit('forwardData', dataToForward);
    console.log('Forwarded data to client:', dataToForward);

    // Clear selected client after forwarding
    setSelectedClientId(null);

    // Update receivedData locally if not master
    if (!isMaster) {
      const alreadyReceived = receivedData.find(
        existingData =>
          existingData.data === dataToForward.data &&
          existingData.senderId === dataToForward.senderId,
      );

      if (!alreadyReceived) {
        // Update received data for the client
        setReceivedData(prevData => [...prevData, dataToForward.data]);
      } else {
        console.log('Data already received:', dataToForward);
      }
    } else {
      console.log('Message forwarded successfully.');
    }
  };

  const clearReceivedData = () => {
    setReceivedData([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={isMaster ? 'Master' : 'Client'}
        isMaster={isMaster}
        setIsMaster={setIsMaster}
        deviceName={deviceName}
      />

      <View style={styles.container}>
        {/* Master/Client selection */}

        {!isMaster && (
          <Input
            value={masterIp}
            onChangeText={setMasterIp}
            placeholder={'Master IP'}
          />
        )}
        {connected ? (
          <Button
            onPress={disconnect}
            style={styles.button}
            title="Disconnect"
          />
        ) : (
          <Button title="Connect" onPress={connect} />
        )}
        <Input
          value={data}
          onChangeText={setData}
          placeholder="Enter message"
        />

        <Button title="Send" onPress={sendMessage} disabled={!connected} />
        {!!receivedData.length && (
          <>
            <View style={styles.receviedDataRow}>
              <Text style={styles.receivedData}>Received Data:</Text>
              {receivedData.length > 0 && (
                <Pressable
                  onPress={clearReceivedData}
                  style={styles.clearContainer}>
                  <Image
                    style={styles.clearData}
                    source={require('./src/assets/clean.png')}
                  />
                </Pressable>
              )}
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={receivedData}
                renderItem={({item}) => (
                  <View style={styles.containerMessage}>
                    <View style={styles.itemContiner}>
                      <Text style={styles.item}>{item.deviceName}</Text>
                      <Text style={[styles.item, styles.itemData]}>
                        {item.data}
                      </Text>
                    </View>
                    {isMaster && (
                      <Pressable
                        onPress={() => forwardData(item)}
                        style={styles.inputContainer}>
                        <Image
                          style={styles.arrow}
                          source={require('./src/assets/arrow.png')}
                        />
                      </Pressable>
                    )}
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </>
        )}
        {isMaster && (
          <>
            <Text style={styles.receivedData}>Connected Clients:</Text>
            <View style={styles.connectedClients}>
              {isMaster && (
                <View style={styles.listContainer}>
                  <FlatList
                    data={connectedClients}
                    renderItem={({item}) => ConnectedClients(item)}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
