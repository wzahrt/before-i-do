import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { textStyles } from '../TextStyles';
import auth from "@react-native-firebase/auth";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = (props, navigation) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coupleCode, setCoupleCode] = useState('');

  const handleLogin = () => {
    auth().signInWithEmailAndPassword(email, password)
    .then((res)=>{
      console.log('User signed in with credentials ' + email , password);
      console.log(res)
      props.navigation.push('Main');
    })
    .catch((err)=>{
      console.log(err)
    })
    
  };

  const handleSignUp = () => {
    props.navigation.push('Signup');
  };
  

  return (
    <ImageBackground
      // source={require('../assets/images/login.png')}
      source={require('../assets/images/blank_page.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text 
          style={textStyles.text}
        > 
          Login Screen
        </Text>
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
});

export default LoginScreen;
