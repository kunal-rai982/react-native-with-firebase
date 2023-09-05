import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const InputBox = props => {
  return (
    <View>
      <TextInput style={{...styles.input, ...props.style}} {...props} />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical:10,
    fontSize:15,
    borderRadius:15,
    padding:10
  },
});
export default InputBox;
