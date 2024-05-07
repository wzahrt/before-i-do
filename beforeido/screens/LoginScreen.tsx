import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Pressable } from 'react-native';
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
      source={require('../assets/images/login.png')}
      style={styles.backgroundImage}
      imageStyle={{opacity:0.3}}
    >
      <View 
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
    >
        <Text 
          style={textStyles.loginHeader}
        > 
          Çift kullanıcı girişi
        </Text>
        <Text 
          style={textStyles.loginInstr}
        > 
          Raporunuzu kontrol etmek ve diğer içerikler için.
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ height: 40, width: 300, backgroundColor: 'white', borderColor: 'red', borderWidth: 2, marginVertical: 10, paddingHorizontal: 5}}
        />
        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{ height: 40, width: 300, borderColor: 'red', borderWidth: 2, backgroundColor:'white', marginVertical: 10, paddingHorizontal: 5 }}
        />
        <Pressable 
          style={textStyles.loginButton}
          // We're going to want this to navigate us to change the 'next question' value
          onPress={handleLogin}> 
          <Text style={textStyles.loginButtonText} >
          Giriş yapın
          </Text> 
        </Pressable>  
        <Text></Text>
        <Text 
          style={{fontSize: 16, color: 'black', marginVertical: 10, textAlign: 'center', width: 270,}}
        > 
          Evet demeden önce hesabınız yok mu?
        </Text> 
        <Pressable 
          style={textStyles.signUpButton}
          // We're going to want this to navigate us to change the 'next question' value
          onPress={handleSignUp}> 
          <Text style={textStyles.signUpButtonText} >
          Kayıt olun
          </Text> 
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
});

export default LoginScreen;
