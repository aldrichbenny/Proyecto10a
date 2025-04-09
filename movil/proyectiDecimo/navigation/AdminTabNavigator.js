import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminScreen from 'screens/AdminScreen';
import VerClientesScreen from 'screens/VerClientesScreen';
import VerSolicitudes from 'screens/VerSolicitudes';
import ProfileAdmin from 'screens/ProfileAdmin';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'Dashboard':
                return <Ionicons name="analytics" size={size} color={color} />;
              case 'Clients':
                return <FontAwesome5 name="users" size={size} color={color} />;
              case 'Requests':
                return <MaterialCommunityIcons name="file-document-edit" size={size} color={color} />;
              case 'Profile':
                return <MaterialIcons name="person" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#A94442',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            marginBottom: 7, // Add margin bottom to the labels
          },
          tabBarStyle: {
            height: 60, // You might need to adjust the total height
          },
        })}>
        <Tab.Screen name="Dashboard" component={AdminScreen} />
        <Tab.Screen name="Clients" component={VerClientesScreen} />
        <Tab.Screen name="Requests" component={VerSolicitudes} />
        <Tab.Screen name="Profile" component={ProfileAdmin} />
      </Tab.Navigator>
    );
  };

export default AdminTabNavigator;