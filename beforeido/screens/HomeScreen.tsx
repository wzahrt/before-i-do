import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { textStyles } from '../TextStyles';
import { fetchData } from '../userData.tsx'; 


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

function HomeScreen({ navigation }: HomeScreenProps) {
  let uid: undefined | string | null; 
  const [coupleCode, setCoupleCode] = useState("");

  useEffect(() => { // Get couple code 
    fetchData().then((user) => {
      uid = user?.uid, 
      setCoupleCode(user.coupleCode) 
    })
  }
  , []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFBFB' }}>
      <Text
      style={textStyles.loginHeader}
      >Home</Text>
      <Image 
        source={require('../assets/images/home_page_header.jpg')} 
        style={{width: 370, height: 210, }}
        resizeMode="cover"
      />
      <View style={{ flexDirection: 'row', flex: 0, alignItems: 'center', justifyContent: 'center',}}>
        <Pressable 
          onPress={() => navigation.push('Assessment')}> 
          <Image source={require('../assets/images/home_page_start_assestment.jpg')}
          style={{width: 150, height: 150, margin: 10}}
          resizeMode="cover"
          />
        </Pressable>  
        <Pressable 
          onPress={() => navigation.push('Results')}> 
          <Image source={require('../assets/images/home_page_relationship_report.jpg')}
          style={{width: 150, height: 150, margin: 20}}
          resizeMode="cover"
          />
        </Pressable>
      </View>
      <Text
        style={{backgroundColor: '#ffccd4', padding: 8, borderRadius: 5, overflow: 'hidden'}}>
        Your Couple Code: {coupleCode}
      </Text>
    </View>
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