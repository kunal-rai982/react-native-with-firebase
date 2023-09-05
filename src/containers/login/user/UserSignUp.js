import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const UserSignUp = () => {
  const [value, setValue] = useState({
    email: '',
    pwd: '',
    role: 'user',
    name: '',
    pwd1: '',
  });
  const handledata = (text, event) => {
    setValue(prev => {
      return {
        ...prev,
        [event]: text,
      };
    });
  };
  const signUp = () => {
    const {email, pwd, role, name, pwd1} = value;
    if (pwd === pwd1) {
      auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then(() => {
          console.log('then working');
          try {
            const usersCollection = firestore()
              .collection('UsersData')
              .doc(auth().currentUser.uid)
              .set({
                uid: auth().currentUser.uid,
                email,
                pwd,
                role,
                name,
              });

            console.log('data added', usersCollection);
          } catch (error) {
            console.log('data not added', error);
          }
        })
        .catch(err => console.log('ffdfd', err));
      setValue(pre => {
        return {
          ...pre,
          email: '',
          pwd: '',
          pwd1: '',
          name: '',
        };
      });
    } else {
      Alert.alert('password different');
    }
  };

  return (
    <>
      <View style={styles.inputcontainer}>
        <TextInput
          onChangeText={text => handledata(text, 'name')}
          placeholder="Enter Name"
          style={styles.textinput}
        />
        <TextInput
          onChangeText={text => handledata(text, 'email')}
          placeholder="Enter Email"
          style={styles.textinput}
        />
        <TextInput
          onChangeText={text => handledata(text, 'pwd')}
          placeholder="Enter Password"
          style={styles.textinput}
        />
        <TextInput
          onChangeText={text => handledata(text, 'pwd1')}
          placeholder="Enter Password Again"
          style={styles.textinput}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.btn} onPress={() => signUp()}>
          <Text style={styles.text}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 42,
    width: '87%',
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
  textinput: {
    borderBottomWidth: 1,
    margin: 15,
    padding: 10,
  },
  inputcontainer: {
    marginTop: 20,
  },
});

export default UserSignUp;
