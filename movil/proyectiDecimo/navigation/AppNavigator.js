import React from 'react';
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetailsScreen from 'screens/ItemDetailsScreen';
import CartScreen from 'screens/CartScreen';
import NotificationsScreen from 'screens/NotificationsScreen';
import CheckoutScreen from 'screens/CheckoutScreen';
import AdminScreen from 'screens/AdminScreen';
import VerClientesScreen from 'screens/VerClientesScreen';
import HomeScreen from 'screens/HomeScreen';
import AdminTabNavigator from './AdminTabNavigator';
import ProfileAdmin from 'screens/ProfileAdmin';
import VerSolicitudes from 'screens/VerSolicitudes';
import DetalleSolicitud from './DetalleSolicitud';
import SigninScreen from 'screens/SigninScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Signin'}
      screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      
      <Stack.Screen name="AdminScreen" component={AdminTabNavigator} />
      <Stack.Screen name="VerClientes" component={VerClientesScreen} />
      <Stack.Screen name="VerSolicitudes" component={VerSolicitudes} />
      <Stack.Screen name="DetalleSolicitud" component={DetalleSolicitud} />
      <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigator;