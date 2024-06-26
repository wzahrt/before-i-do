/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {View, Image, Text } from 'react-native';


// All stack imports 
import AssessmentStack from './stacks/AssessmentStack';
import ConsultationStack from './stacks/ConsultationStack';
import EntryStack from './stacks/EntryStack';
import ResultsStack from './stacks/ResultsStack';
import HomeStack from './stacks/homeStack';
import ProfileStack from './stacks/profileStack';
 
// Other imports 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-svg';


export type RootStackParamList = {
  About: undefined; 
  About2: undefined;
  Assessment: undefined; 
  Consultation: undefined; 
  Entry: undefined; 
  Home: undefined;
  HomePage: undefined; 
  Login: undefined; 
  Main: undefined; 
  Profile: undefined;
  ProfilePage: undefined; 
  Results: undefined; 
  Signup: undefined; 
  Questionnaire1: undefined;
  ResultsBreakdown: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Entry" component={EntryStack} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
     </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator()

export function TabNavigator() { // Defining the tab navigation 
  return (
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown:false
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{
            tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{height: 25, width: 25}}
              source={require('./assets/images/home.png')}/>
              <Text>Home</Text>
            </View>
          )}}/>
          {/* <Tab.Screen name="Profile" component={ProfileStack} /> */}
        </Tab.Navigator>
   );
}

export default App;
