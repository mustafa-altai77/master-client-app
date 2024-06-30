import React from 'react';
import {styles} from './styles';
import {Text, TextInput, View} from 'react-native';
const Input = ({
  lable,
  type,
  value,
  onChangeText,
  style,
  options,
  placeholder,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{lable}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, style]}
          {...props}
        />
      </View>
    </View>
  );
};

export default Input;
