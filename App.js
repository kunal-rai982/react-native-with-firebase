import {
  UserStackNavigator,
  AdminStackNavigator,
  LoginStackNavigator,
} from './src/navigation';

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
const App = () => {
  // const firestore = firebase.firestore;
  // const auth = firebase.auth;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const getData = async () => {
    let data = await firestore()
      .collection('UsersData')
      .doc(auth().currentUser.uid)
      .get();
    if (data?.data()?.role === 'user') {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };

  auth().onAuthStateChanged(user => {
    try {
      if (user != null) {
        setIsLoggedIn(true);
        getData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('on auth state changed error ==>', e);
    }
  });

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <LoginStackNavigator />
      ) : isUser ? (
        <UserStackNavigator />
      ) : (
        <AdminStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;

// useEffect(() => {
//   firestore()
//     .collection('users')
//     .doc(auth().currentUser.uid)
//     .get()
//     .then(user => {
//       setUser(user.data());
//     });
// }, []);
