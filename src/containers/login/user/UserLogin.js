import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserLogin = () => {
  const [fireData, setFireData] = useState(null);
  const [values, setValues] = useState({
    email: '',
    pwd: '',
    role: 'user',
  });
  const handleUserState = (texts, event) => {
    setValues(previous => {
      return {
        ...previous,
        [event]: texts,
      };
    });
  };
  const handleOnPress = () => {
    // here i have to match the collection that if its collectiojn matching the the id pass are
    //user or not
    let {email, pwd, role} = values;
    auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(async () => {
        const respo = await firestore()
          .collection('UsersData')
          .doc(auth().currentUser.uid)
          .get()
          .then(da => {
            console.log(da.data());
            const data = da.data();
            if (data.role != role) {
              Alert.alert('unauth');
            }
          })
          .catch(err => console.log(err));
        console.log('===>>', auth().currentUser.uid, respo.data());
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <View>
        <TextInput
          onChangeText={text => handleUserState(text, 'email')}
          style={styles.textinput}
          placeholder="Enter Email"
        />
        <TextInput
          onChangeText={text => handleUserState(text, 'pwd')}
          style={styles.textinput}
          placeholder="Enter Password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.lastContainer}>
        <TouchableOpacity onPress={() => handleOnPress()} style={styles.btn}>
          <Text style={styles.text}> Login</Text>
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

  lastContainer: {
    alignItems: 'center',
  },

  textinput: {
    borderBottomWidth: 1,
    margin: 15,
    padding: 10,
  },
  inputcontainer: {
    marginTop: 20,
  },
});
export default UserLogin;
