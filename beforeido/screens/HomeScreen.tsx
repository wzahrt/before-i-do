import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

// const HomeScreen: React.FC<HomeScreenProps> = (props) => {
//   return (
//     <ImageBackground
//       source={require('../assets/images/home_page.png')}
//       style={styles.backgroundImage}
//     >
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Profile"
//           onPress={() => props.navigation.push('Profile')}
//         />
//         <Button
//           title="Take the Assessment"
//           onPress={() => props.navigation.push('Assessment')}
//         />
//         <Button
//           title="View Results"
//           onPress={() => props.navigation.push('Results')}
//         />
//         <Button
//           title="Consultation"
//           onPress={() => props.navigation.push('Consultation')}
//         />
//         <Text>Your Couple Code: 20</Text>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
// });

// export default HomeScreen;
function HomeScreen({ navigation }: HomeScreenProps) {
  return (
        <ImageBackground
          source={require('../assets/images/home_page.png')}
          style={styles.backgroundImage}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
              title="Go to Profile"
              onPress={() => navigation.push('Profile')}
            />
            <Button
              title="Take the Assessment"
              onPress={() => navigation.push('Assessment')}
            />
            <Button
              title="View Results"
              onPress={() => navigation.push('Results')}
            />
            <Button
              title="Consultation"
              onPress={() => navigation.push('Consultation')}
            />
            <Text>Your Couple Code: 20</Text>
          </View>
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

// const HomeScreen = () => {
//   return (
//     <View style={{alignItems: 'center', top: 50}}>
//       <Text>Home!</Text>
//     </View>
//   );
// };

export default HomeScreen;