import React from 'react';
import {Text, Button, View, StyleSheet, ImageBackground } from '../node_modules/react-native';
import { NativeStackScreenProps } from '../node_modules/@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList

type AboutScreenProps = NativeStackScreenProps<RootStackParamList, "About">;
const AboutScreen: React.FC<AboutScreenProps> = (props) => {
  return (
    <ImageBackground
      source={require('../assets/images/first_page.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text>About Screen</Text>
        <Button
          title="Continue"
          onPress={() => props.navigation.push('Login')}
        />
      </View>
    </ImageBackground>
  );
};

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

export default AboutScreen;
