import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserDashboard from '../containers/dashboard';
import AdminLoginPage from '../containers/login/admin/AdminLogin';
import AdminAddData from '../containers/dashboard/admin/adminAddData';
import UserLogin from '../containers/login/user/UserLogin';
import UserSignUp from '../containers/login/user/UserSignUp';
import LoginMain from '../containers/login';
import AdminDashboard from '../containers/dashboard/admin';
import AdminSignUp from '../containers/login/admin/AdminSignUp';

const Stack = createNativeStackNavigator();
const UserStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="dashboard" component={UserDashboard} />
    </Stack.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="adminadddata" component={AdminAddData} />
      <Stack.Screen name="admindashboard" component={AdminDashboard} />
      <Stack.Screen name="adminSideUserDashboard" component={UserDashboard} />
    </Stack.Navigator>
  );
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainLogin" component={LoginMain} />
      <Stack.Screen name="userLogin" component={UserLogin} />
      <Stack.Screen name="userSignUp" component={UserSignUp} />
      <Stack.Screen name="adminLogin" component={AdminLoginPage} />
      <Stack.Screen name="adminSignUp" component={AdminSignUp} />

      {/* <Stack.Screen name='adminLoginSignupPage'/>
      <Stack.Screen name='adminSignUp'/> */}
    </Stack.Navigator>
  );
};
export {UserStackNavigator, AdminStackNavigator, LoginStackNavigator};
