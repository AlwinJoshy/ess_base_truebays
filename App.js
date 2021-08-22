import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Login_Screen,
  Dashboard_Screen,
  Payslip_Screen,
  RequestForLeave_Screen,
  DynamicAddEdit_Screen,
  DataListDisplay_Screen,
  ClanderDetailsView_Screen,
  PayslipSheet_Screen,
  Register_Screen,
  TimeSheetAddEdit_Screen
} from './TestScreens/Screens.js'


const Stack = createStackNavigator();

const authenticateAWS = () => {

}


export default function App() {

  authenticateAWS();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' screenOptions={{ headerTitleAlign: 'center' }}>

        <Stack.Screen name="Login" component={Login_Screen} />

        <Stack.Screen name="Dashboard" component={Dashboard_Screen} />

        <Stack.Screen name="Request for Leave" component={RequestForLeave_Screen} />

        <Stack.Screen name="DynamicList" component={DataListDisplay_Screen} />



        <Stack.Screen name="DynamicAddEdit" component={DynamicAddEdit_Screen} />

        <Stack.Screen name="CalenderDetailView" component={ClanderDetailsView_Screen} />

        <Stack.Screen  name="PayslipScreen" component={PayslipSheet_Screen} />
        <Stack.Screen  name="RegisterScreen" component={Register_Screen} />
        
        <Stack.Screen  name="TimeSheetScreen" component={TimeSheetAddEdit_Screen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
