import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"


type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const SignupScreen: React.FC<SignupScreenProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coupleCode, setCoupleCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



  const handleSignUp = () => {
    // Here you can implement your signup logic
    auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      console.log('User created with credentials' + email , password);
      props.navigation.push('Login'); // After successful login, you can navigate to the login screen
    })
    .catch((err)=>{
      console.log(err)
    })

     firestore().collection("users").add({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        coupleCode: ((coupleCode=='') ? (Math.floor(Math.random()*90000) + 10000).toString() : coupleCode.toString()), 

        
     }).then((res)=>{
        console.log("adding user")
        console.log("Added new user to FireStore: " + firstName, lastName)

     }).catch((e)=> {
      console.log(e)
     })
   
  };

  return (
    <ImageBackground
      // source={require('../assets/images/login.png')}
      source={require('../assets/images/blank_page.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign Up Screen</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        />
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
        <Button
          title="Return To Login"
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

export default SignupScreen;
