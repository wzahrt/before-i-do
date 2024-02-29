import React from 'react';
import {Text, Button, View, StyleSheet, ImageBackground, Pressable } from '../node_modules/react-native';
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
        <Text style={styles.text}>About Screen</Text>
        <Pressable 
          onPress={() => props.navigation.push('Login')}
          style={styles.button}
          > 
          <Text>Continue</Text> 
        </Pressable>
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
  text: {
    position: 'absolute', // Set position to absolute
    top: 550, // Set the distance from the top of the screen
    textAlign: 'center', 
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }, 
  button: {
    position: 'absolute', 
    top: 600, 
    textAlign: 'center'
  }
});

export default AboutScreen;
