import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/login/SplashScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import CustomButtonNavigationBar from './src/navigation/CustomBottomNavigationBar';
import RatingToiletScreen from './src/screens/RateToilet/RatingToiletScreen';
import ThankYou from './src/screens/RateToilet/ThankYou';
import AccountScreen from './src/screens/home/AccountScreen';
import OwnedToiletsScreen from './src/screens/account/OwnedToiletsScreen';
import ReviewsScreen from './src/screens/account/ReviewsScreen';
import ReportsScreen from './src/screens/account/ReportsScreen';
import WriteReportScreen from './src/screens/account/WriteReportScreen';
import AddInfoPage from './src/screens/addPage/AddInfoPage';
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {EventRegister} from "react-native-event-listeners"

import ThemeContext from './src/darkMode/ThemeContext';
import Theme from './src/darkMode/Theme';




const Stack = createNativeStackNavigator();

export default function App() {

  const [mode, setMode] = useState(false);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) =>{
      setMode(data);
      console.log(data);
      //console.log("Data is accessible from App.js")
    });
    return () => {
      EventRegister.removeAllListeners(eventListener);
    }
  }
  )

  return (

    <ThemeContext.Provider value={mode == true ? Theme.dark : Theme.light}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' >
      <Stack.Screen 
          name="Splash"
          component={SplashScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            },
            headerShown: false,
          }} />
        <Stack.Screen
            name='Home'
            component={CustomButtonNavigationBar}
            options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} />
        <Stack.Screen 
          name="Rating"
          component={RatingToiletScreen}
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
        {/* <Stack.Screen
          name='Home'
          component={CustomButtonNavigationBar}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }} /> */}
        <Stack.Screen 
          name='Rate Toilet'
          component={RatingToiletScreen}
          
         />
         <Stack.Screen 
          name='More Toilet Infomation'
          component={AddInfoPage}
          options={{
            headerStyle: {
              backgroundColor: "#f28d82"
            }
          }}
         />

        {/* <Stack.Screen 
              name="Rating"
              component={RatingToiletScreen}
              options={{
                  headerStyle:{
                    backgroundColor: "#f28d82"
                  }
                }
              }
            /> */}

          {/* <Stack.Screen 
            name="ThankYou"
            component={ThankYou}
            options={{
                headerStyle:{
                  backgroundColor: "#f28d82"
                },
                headerShown: false,
              }
            }
          }
        /> */}

        <Stack.Screen 
          name="ThankYou"
          component={ThankYou}
          options={{
              headerStyle:{
                backgroundColor: "#f28d82"
              },
              headerShown: false,
            }
          }
        />
        <Stack.Screen
            name='Profile'
            component={AccountScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }

          />
          <Stack.Screen
            name='Owned Toilets'
            component={OwnedToiletsScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }

          />
          <Stack.Screen
            name='Reviews'
            component={ReviewsScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }

          />
          <Stack.Screen
            name='Reports'
            component={ReportsScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }
          />
          <Stack.Screen
            name='WriteReport'
            component={WriteReportScreen}
            options={
              {headerStyle: {
                backgroundColor: "#f28d82"
              }}
            }
          />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
    


    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Rating'>
    //     <Stack.Screen 
    //       name="Rating"
    //       component={RatingToiletScreen}
    //       options={{
    //           headerStyle:{
    //             backgroundColor: "#f28d82"
    //           }
    //         }
    //       }
    //     />

    //     <Stack.Screen 
    //       name="ThankYou"
    //       component={ThankYou}
    //       options={{
    //           headerStyle:{
    //             backgroundColor: "#f28d82"
    //           },
    //           headerShown: false,
    //         }
    //       }
    //     />

    //   </Stack.Navigator>

    // </NavigationContainer>
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
