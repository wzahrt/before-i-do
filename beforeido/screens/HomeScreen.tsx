import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { textStyles } from '../TextStyles';
import { fetchData } from '../userData.tsx'; 
import { fetchCoupleData } from '../coupleData.tsx';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

function HomeScreen({ navigation }: HomeScreenProps) {
  let uid: undefined | string | null; 
  const [coupleCode, setCoupleCode] = useState("");
  const [coupleData, setCoupleData] = useState({user1: "", user1Done: false, user2: "", user2Done: false})

  useEffect(() => { // Get couple code 
    fetchData().then((user) => {
      uid = user?.uid, 
      setCoupleCode(user.coupleCode) 
    })
  }
  , []);

  useEffect(() => { // Get Couple Data
    fetchCoupleData(coupleCode).then((couple) => { 
      setCoupleData({
        user1: couple.user1, 
        user1Done: couple.user1Done, 
        user2: couple.user2, 
        user2Done: couple.user2Done
      }); 
    }).catch((error) => { 
      console.log("Error: ", error)
    });
  }, [coupleCode])

  const canViewResults = () : Boolean => { 
    console.log("Couple Data: \nUser2: ", coupleData.user2, "\nUser1Done: ", coupleData.user1Done, "\nUser2Done: ", coupleData.user2Done)

    if(coupleData.user2 == null) return false; 
    if(coupleData.user1Done == false) return false; 
    if(coupleData.user2Done == false) return false; 
    return true; 
  }
  
  const handleViewResults = () => {
    if(canViewResults()) {
      navigation.push('Results');
    } else Alert.alert("You and your partner must both complete the assessment before we can look at results!")

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFBFB' }}>
      <Text
      style={textStyles.loginHeader}
      >Ana Ekran</Text>
      <Image 
        source={require('../assets/images/home_page_header.jpg')} 
        style={{width: 370, height: 210, }}
        resizeMode="cover"
      />
      <View style={{ flexDirection: 'row', flex: 0, alignItems: 'center', justifyContent: 'center',}}>
        <Pressable 
          onPress={() => navigation.push('Assessment')}> 
          <Image source={require('../assets/images/start_assessment_turkish.png')}
          style={{width: 150, height: 150, margin: 10}}
          resizeMode="cover"
          />
        </Pressable>  
        <Pressable 
          onPress={() => handleViewResults()}> 
          <Image source={require('../assets/images/relationship_report_turkish.png')}
          style={{width: 150, height: 150, margin: 20}}
          resizeMode="cover"
          />
        </Pressable>
      </View>
      <Text
        style={{backgroundColor: '#ffccd4', padding: 8, borderRadius: 5, overflow: 'hidden'}}>
        Çift Kodunuz: {coupleCode}
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


export default HomeScreen;