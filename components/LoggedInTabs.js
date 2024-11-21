// LoggedInTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from 'react-native-vector-icons'; // Adjust icon library as needed
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoggedInView from './LoggedInView';
import GamesScreen from './GamesScreen';
import PlayableScreen from './PlayableScreen';

const Tab = createBottomTabNavigator();

export default function LoggedInTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Define icons based on the route name
          if (route.name === 'Profil') {
            iconName = 'account'; // Icon name from MaterialIcons
          } else if (route.name === 'Igrice') {
            iconName = 'gamepad'; // Icon name from MaterialIcons
          } else if (route.name === 'Number Game'){
            iconName = 'dice-4'; 
          }

          // Return the icon component
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'navy',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Profil" component={LoggedInView} />
      <Tab.Screen name="Igrice" component={GamesScreen} />
      <Tab.Screen name="Number Game" component={PlayableScreen} />
    </Tab.Navigator>
  );
}