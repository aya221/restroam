import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AddToiletScreen from './screens/AddToiletScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: '#228CDB'
        },
            headerTintColor: '#fff'
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="addToilet" component={AddToiletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}