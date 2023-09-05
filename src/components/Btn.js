import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const Btn = (props) => {
  return (

      <TouchableOpacity style={styles.btn} onPress={()=>props.onPress()}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>

  )
}
const styles = StyleSheet.create({
  btn: {
    height: 42,
    width: '40%',
    borderRadius: 25,
    
    backgroundColor: '#0B3270',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
})

export default Btn