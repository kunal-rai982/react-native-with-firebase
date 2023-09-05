import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
const AdminDashboard = () => {
  return (
    <>
      <View>
        <Text>Admin Dashboard</Text>
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Text>Sign Out </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default AdminDashboard;
