import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import Home from '../screens/main/Home';
import FleetManagement from '../screens/main/FleetManagement';
import BookingForm from '../screens/main/BookingForm';
import Profile from '../screens/main/Profile';

export type MainStackParamList = {
  Home: undefined;
  FleetManagement: undefined;
  Bookings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FleetManagement" component={FleetManagement} />
      <Stack.Screen name="Bookings" component={BookingForm} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainNavigator;