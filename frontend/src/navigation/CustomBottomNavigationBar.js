import React, {useContext, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeContext from '../darkMode/ThemeContext';
// Screens
import AddScreen from '../screens/home/AddScreen';
import MapScreen from '../screens/home/MapScreen';
import AccountScreen from '../screens/home/AccountScreen';
import Theme from '../darkMode/Theme';




// Screen Names
const mapName = 'Map';
const addName = 'Add';
const accountName = 'Account';

const iconsDict = {};
iconsDict[mapName] = 'map';
iconsDict[addName] = 'add-circle';
iconsDict[accountName] = 'person';
const iconsOutlinedDict = {};
iconsOutlinedDict[mapName] = 'map-outline';
iconsOutlinedDict[addName] = 'add-circle-outline';
iconsOutlinedDict[accountName] = 'person-outline';

// former tab
const Tab = createBottomTabNavigator();
// new tab
const MaterialTab = createMaterialBottomTabNavigator();



// fotmer tab options
const screenOpts = ({ route }) => ({
  tabBarLabelPosition: 'below-icon',
  tabBarLabelStyle: {
    paddingBottom: 10,
    fontSize: 10,
  },
  tabBarIconStyle: {
    color: 'red',
  },
  tabBarBadge: '19',
  tabBarBadgeStyle: {
    backgroundColor: '#f28d82',
  },
  tabBarIcon: ({ focused, color, size }) => {
    let iconName; let rn = route.name;
    if (rn === mapName) iconName = focused ? iconsDict[mapName] : iconsOutlinedDict[mapName];
    else if (rn === addName) iconName = focused ? iconsDict[addName] : iconsOutlinedDict[addName];
    else if (rn === accountName) iconName = focused ? iconsDict[accountName] : iconsOutlinedDict[accountName];

    return <Ionicons name={iconName} color={color} size={size} />;
  },
  tabBarActiveTintColor: '#f28d82',
  tabBarInactiveTintColor: 'grey',
});

// new tab options
const materialScreenOpts = ({route}) => ({
  // tabBarColor must be changed (Dark Mode)
  tabBarColor: Theme.light.bottomBar,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName; let rn = route.name;
    //console.log(rn);
    //console.log(route);
    if (rn === mapName) iconName = focused ? iconsDict[mapName] : iconsOutlinedDict[mapName];
    else if (rn === addName) iconName = focused ? iconsDict[addName] : iconsOutlinedDict[addName];
    else if (rn === accountName) iconName = focused ? iconsDict[accountName] : iconsOutlinedDict[accountName];

    size = focused ? 21 : 17;

    return <Ionicons name={iconName} color={color} size={size} />;
  },
});

const materialScreenOptsDark = ({route}) => ({
  // tabBarColor must be changed (Dark Mode)
  tabBarColor: Theme.dark.bottomBar,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName; let rn = route.name;
    //console.log(rn);
    //console.log(route);
    if (rn === mapName) iconName = focused ? iconsDict[mapName] : iconsOutlinedDict[mapName];
    else if (rn === addName) iconName = focused ? iconsDict[addName] : iconsOutlinedDict[addName];
    else if (rn === accountName) iconName = focused ? iconsDict[accountName] : iconsOutlinedDict[accountName];

    size = focused ? 21 : 17;

    return <Ionicons name={iconName} color={color} size={size} />;
  },
});

export default function CustomButtonNavigationBar() {

  const theme = useContext(ThemeContext);
  
  return (
    <MaterialTab.Navigator
      initialRouteName={mapName}
      screenOptions={theme.theme == "light" ? materialScreenOpts : materialScreenOptsDark}
      backBehavior='none'
      shifting={true}
      barStyle={{ backgroundColor: "#FFFFFF", }}
      inactiveColor='grey'
      //active Color must be changed (Dark Mode)
      activeColor={theme.theme == "light" ? "#f28d82": "#ccaa55"}
    >
      <MaterialTab.Screen name={mapName} component={MapScreen} />
      <MaterialTab.Screen name={addName} component={AddScreen} />
      <MaterialTab.Screen name={accountName} component={AccountScreen} />
    </MaterialTab.Navigator>
  )
}
