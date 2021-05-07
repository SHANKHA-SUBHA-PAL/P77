import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen'
import Homescreen from './Screens/HomeScreen'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Exchange from './Screens/ExchangeScreen';


export default function App() {
  return (
    
    <AppContainer/>
    
  );
}

const Tabs = createBottomTabNavigator({

Home:{
  screen:Homescreen
},
RequestScreen:{
  screen:Exchange
}

})
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: Tabs }

})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
