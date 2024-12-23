// --- src/screens/intro/_layout.tsx ---
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreens from './IntroScreens';

const Stack = createStackNavigator();

const IntroLayout = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Intro" component={IntroScreens} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default IntroLayout;