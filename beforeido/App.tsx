/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
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


type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
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


const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
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
