import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const LoginMain = ({navigation}) => {
  // const [values, setValues] = useState({
  //   name:'',
  //   pwd:'',
  //   role:''
  // })
  return (
    <>
      <View style={styles.lastContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('userLogin')}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('userSignUp')}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('adminLogin')}>
          <Text style={styles.text}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 42,
    width: '40%',
    borderRadius: 25,
    margin: 20,
    backgroundColor: '#0B3270',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 500,
    marginTop: 50,
  },
});

export default LoginMain;
