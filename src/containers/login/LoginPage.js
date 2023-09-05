import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleLogin = async () => {
    GoogleSignin.configure();
    // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // const {idToken} = await GoogleSignin.signIn();
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // return auth().signInWithCredential(googleCredential);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  const handleuser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('user created'))
      .catch(error => console.log(error));
    setEmail('');
    setPassword('');
  };
  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('user sign out'))
      .catch(err => console.log(err));
  };

  const alreadyUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('sign in successfully'))
      .catch(err => console.log(err));
    setEmail('');
    setPassword('');
  };
  return (
    <ScrollView>
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Enter Email'}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Enter Password'}
        />
        <TouchableOpacity onPress={() => handleuser()} style={styles.button}>
          <Text>create user</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Enter Email'}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Enter Password'}
        />
        <TouchableOpacity onPress={() => alreadyUser()} style={styles.button}>
          <Text>sign in </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => signOutUser()} style={styles.button}>
          <Text>sign out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => googleLogin()}>
          <Text>Google Signin </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Enter Email'}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Enter Password'}
        />
        <TouchableOpacity onPress={() => handleuser()} style={styles.button}>
          <Text>create user</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    margin: 10,
    padding: 10,
  },
  container: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    margin: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
    color: 'white',
    margin: 10,
    borderRadius: 10,
  },
});

export default LoginPage;
