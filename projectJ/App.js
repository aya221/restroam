
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/login/SplashScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import CustomButtonNavigationBar from './src/navigation/CustomBottomNavigationBar';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome to Restroam' >
        <Stack.Screen
          name='Welcome to Restroam'
          component={SplashScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            },
            headerShown: false,
          }} />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
        <Stack.Screen
          name='Home'
          component={CustomButtonNavigationBar}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: "black",
  }
});
