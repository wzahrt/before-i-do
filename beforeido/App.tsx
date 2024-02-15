/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined; 
  Signup: undefined; 
};

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => props.navigation.push('Profile')}
      />
    </View>
  );
};


type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">; 
const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => props.navigation.push('Home')}
      />
    </View>
  );
};


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">; 
const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  // TODO: 
  // Option 1: Sign up 
  //    Sign in has boxes you can fill in, upon succesful verification you can be sent to the home page. 
  // Option 2: Sign in 
  //    Sign up should send you to a sign up page 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coupleCode, setCoupleCode] = useState('');

  const handleLogin = () => {
    // Here you can implement your login logic
    console.log('Logging in...');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Couple Code:', coupleCode);
    // After successful login, you can navigate to the home screen
    props.navigation.push('Home');
  };

  const handleSignUp = () => {
    // Navigate to the sign-up screen
    props.navigation.push('Signup');
  };
  
  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Couple Code"
        value={coupleCode}
        onChangeText={setCoupleCode}
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
      />
    </View>
  );
};

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">; 
const SignupScreen: React.FC<SignupScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Signup Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => props.navigation.push('Home')}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator> 
    </NavigationContainer>
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
        
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Tell sophia she is awesome, and to capitalize her own name
    //       </Section>
    //       <Section title="Step Two">
    //         Tell Luis he looks cute today
    //       </Section>
          
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});





export default App;
