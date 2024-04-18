import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
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

  const updateCoupleCodeCollection = () => { 
    try {    //Check that coupleCode already exists in the "coupleCode" collection 
      // Query the coupleCode collection for the specific document
      const coupleCodeRef = firestore().collection('coupleCode').doc(coupleCode);

      coupleCodeRef.get() // Get the document
          .then((doc) => {
              if (doc.exists) { // If so, add this user to that coupleCode document 
                if (doc.data().hasOwnProperty("user2")) {
                  // TODO: Throw an error on the screen 
                  Alert.alert("This Couple Code is already in use by a couple!");
                } else {
                  coupleCodeRef.set({ user2: email, user2Done: false, }, {merge: true})
                  console.log("The document does not contain the 'user2' field.");
                  updateAuth(); 
                }} 
              else {  // If not, add new coupleCode document with this user
                coupleCodeRef.set({user1: email, user1Done: false, })
                updateAuth(); 
              }
          })
          .catch((error) => {
              console.log("Error getting document:", error);
          });

    } catch (error) {
        console.error('Error fetching user document: ', error);
        return null;
    }
}

  const updateAuth = () => { 
    // Here you can implement your signup logic
    auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      console.log('User created with credentials' + email , password);
      updateUsersCollection(); 
    })
    .catch((err)=>{
      console.log("error when updating the authentification")
      console.log(err)
    })
  }

  const updateUsersCollection = () => {
    firestore().collection("users").add({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      coupleCode: coupleCode, 
      
    }).then((res)=>{
      console.log("adding user")
      console.log("Added new user to FireStore: " + firstName, lastName)
      props.navigation.push('Login'); // After successful login, you can navigate to the login screen

    }).catch((e)=> {
      console.log("Error when updating the user collection")
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
        <Text>If partner has not registered, create couple code below.</Text>
        <Text>If partner has registered, enter partners code below.</Text>
        <TextInput
          placeholder="Couple Code"
          value={coupleCode}
          onChangeText={setCoupleCode}
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        />
        <Button
          title="Create Account"
          onPress={updateCoupleCodeCollection}
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
