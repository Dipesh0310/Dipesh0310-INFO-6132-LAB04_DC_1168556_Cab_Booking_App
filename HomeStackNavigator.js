// HomeStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from './CabsListScreen';
import CabDetailScreen from './CabDetailScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cabs List" component={CabsListScreen} />
      <Stack.Screen name="Cab Detail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

