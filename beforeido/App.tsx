/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import AboutScreen from './screens/AboutScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import ConsultationScreen from './screens/ConsultationScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import ResultsScreen from './screens/ResultsScreen';
import SignupScreen from './screens/SignupScreen';
import createNativeStackNavigator from './node_modules/@react-navigation/native-stack/src/navigators/createNativeStackNavigator';
import NavigationContainer  from './node_modules/@react-navigation/native/lib/commonjs/NavigationContainer.js';
import { StyleSheet, useColorScheme } from './node_modules/react-native';
import Colors from './node_modules/react-native/Libraries/NewAppScreen/components/Colors.js';


export type RootStackParamList = {
  About: undefined; 
  Assessment: undefined; 
  Consultation: undefined; 
  Home: undefined;
  Login: undefined; 
  Profile: undefined;
  Results: undefined; 
  Signup: undefined; 
};


const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /// **** STACK NAVIGATOR IS IN ALPHABETICAL ORDER, KEEP IT THAT WAY ***** 

  return (
    <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} />
            <Stack.Screen name="Consultation" component={ConsultationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});


export default App;
