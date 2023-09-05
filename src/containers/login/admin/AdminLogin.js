import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const AdminLoginPage = ({navigation}) => {
  const [values, setValues] = useState({
    email: '',
    pwd: '',
    role: 'admin',
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
    // here i have to match the collection that if its collection matching the the id pass are
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
      <View style={styles.lastContainer}>
        <Text style={styles.welcomeText}>Welcome Admin</Text>
      </View>
      <View>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          onChangeText={te => handleUserState(te, 'email')}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={te => handleUserState(te, 'pwd')}
        />
      </View>
      <View style={styles.lastContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => handleOnPress()}>
          <Text style={styles.text}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('adminSignUp')}>
          <Text>Not Registered? Register here</Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    margin: 10,
    padding: 10,
  },
  container: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    margin: 10,
  },

  welcomeText: {
    fontSize: 40,
    fontWeight: 500,
    marginTop: 50,
  },
  lastContainer: {
    alignItems: 'center',
  },
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
});

// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     KeyboardAvoidingView
//   } from 'react-native';
//   import auth from '@react-native-firebase/auth';
//   import React, {useState} from 'react';
//   import {
//     GoogleSignin,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';

//   const AdminLoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const googleLogin = async () => {
//       GoogleSignin.configure();
//       // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

//       // const {idToken} = await GoogleSignin.signIn();
//       // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       // return auth().signInWithCredential(googleCredential);
//       try {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();

//       } catch (error) {
//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//           console.log(error);
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//           console.log(error);
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//           console.log(error);
//         } else {
//           console.log(error);
//         }
//       }
//     };

//     const handleuser = () => {
//       auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then(() => console.log('user created'))
//         .catch(error => console.log(error));
//       setEmail('');
//       setPassword('');
//     };
//     const signOutUser = () => {
//       auth()
//         .signOut()
//         .then(() => console.log('user sign out'))
//         .catch(err => console.log(err));
//     };

//     const alreadyUser = () => {
//       auth()
//         .signInWithEmailAndPassword(email, password)
//         .then(() => console.log('sign in successfully'))
//         .catch(err => console.log(err));
//       setEmail('');
//       setPassword('');
//     };
//     return (
//       <ScrollView>
//       <KeyboardAvoidingView>
//         <View style={styles.container}>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={text => setEmail(text)}
//             placeholder={'Enter Email'}
//           />
//           <TextInput
//             style={styles.input}
//             value={password}
//             onChangeText={text => setPassword(text)}
//             placeholder={'Enter Password'}
//           />
//           <TouchableOpacity onPress={() => handleuser()} style={styles.button}>
//             <Text>create user</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.container}>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={text => setEmail(text)}
//             placeholder={'Enter Email'}
//           />
//           <TextInput
//             style={styles.input}
//             value={password}
//             onChangeText={text => setPassword(text)}
//             placeholder={'Enter Password'}
//             secureTextEntry={true}
//           />
//           <TouchableOpacity onPress={() => alreadyUser()} style={styles.button}>
//             <Text>sign in </Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <TouchableOpacity onPress={() => signOutUser()} style={styles.button}>
//             <Text>sign out</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <TouchableOpacity style={styles.button} onPress={() => googleLogin()}>
//             <Text>Google Signin </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.container}>
//           <TextInput
//             style={styles.input}
//             value={email}
//             onChangeText={text => setEmail(text)}
//             placeholder={'Enter Email'}
//           />
//           <TextInput
//             style={styles.input}
//             value={password}
//             onChangeText={text => setPassword(text)}
//             placeholder={'Enter Password'}
//             secureTextEntry={true}

//           />
//           <TouchableOpacity onPress={() => handleuser()} style={styles.button}>
//             <Text>create user</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//       </ScrollView>
//     );
//   };
//   const styles = StyleSheet.create({
//     input: {
//       borderBottomWidth: 2,
//       margin: 10,
//       padding: 10,
//     },
//     container: {
//       backgroundColor: 'lightgrey',
//       borderWidth: 1,
//       margin: 10,
//     },
//     button: {
//       alignItems: 'center',
//       padding: 10,
//       backgroundColor: 'grey',
//       color: 'white',
//       margin: 10,
//       borderRadius: 10,
//     },
//   });

export default AdminLoginPage;
