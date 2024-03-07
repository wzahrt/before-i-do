import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import firestore from '@react-native-firebase/firestore';

// Reference to the collection
const usersCollection = firestore().collection('users');

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const SignupScreen: React.FC<SignupScreenProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coupleCode, setCoupleCode] = useState('');

  const handleSignUp = () => {
    // Here you can implement your signup logic
    console.log('Signing up...');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Couple Code:', coupleCode);

    // Add a new document with a generated ID
    // usersCollection
    // .add({
    //   Name: 'Vivian Deng',
    //   Password: password, 
    //   Email: email,
    //   CoupleCode: coupleCode
    // })
    // .then((docRef) => {
    //   console.log('Document written with ID: ', docRef.id);
    // })
    // .catch((error) => {
    //   console.error('Error adding document: ', error);
    // });

    // After successful login, you can navigate to the login screen
    props.navigation.push('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/images/login.png')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign Up Screen</Text>
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
          placeholder="Couple Code - Optional"
          value={coupleCode}
          onChangeText={setCoupleCode}
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        />
        <Button
          title="Create Account"
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
});

export default SignupScreen;
