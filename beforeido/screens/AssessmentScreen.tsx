import { React, useState, useEffect } from 'react';
import { View, Image, Text, Button, Pressable, ImageBackground, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { fetchData } from '../userData.tsx'; 
import { fetchCoupleData } from '../coupleData.tsx';
import { textStyles } from '../TextStyles';
import firestore from '@react-native-firebase/firestore';



type AssessmentScreenProps = NativeStackScreenProps<RootStackParamList, "Assessment">;

const AssessmentScreen: React.FC<AssessmentScreenProps> = (props) => {
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
  });
  }, [coupleCode])


  const handleNewAssessment = () => {        
    // Clear questionnaire results 
    firestore().collection(`users/${uid}/questionnaire`)
      .get()
      .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
      })
      .catch(error => {
      console.log("Error deleting questionnaire results:", error);
      });
    
    
    // Update curSection
    firestore().collection('users').doc(uid).update({curSection: 1}).catch(error => {
      console.log("Error updating curSection:", error);
    }
    );

     // Test for partner, push to questionnaire
    if(canTakeAssessment()) {
      props.navigation.push('Questionnaire1');
    } else { 
      Alert.alert("You need a partner with a matching couple code to proceed!"); 
    }
  };

  const canTakeAssessment = () : Boolean => { 
    if(coupleData.user2 != null) return true; 
    else return false; 
  }

  const handleContinueAssessment = () => { // Push to assessment if user is allowed to
    if(canTakeAssessment()) {
      props.navigation.push('Questionnaire1');
    } else Alert.alert("You need a partner with a matching couple code to proceed!")
  };

  const canViewResults = () : Boolean => { 
    if(coupleData.user2 == null) return false; 
    if(coupleData.user1Done == false) return false; 
    if(coupleData.user2Done == false) return false; 
    return true; 
  }
  
  const handleViewResults = () => {
    if(canViewResults()) {
      props.navigation.push('Results');
    } else Alert.alert("You and your partner must both complete the assessment before we can look at results!")

  };

  return (
    // <ImageBackground
    //   source={require('../assets/images/relationship_dynamics.png')}
    //   style={styles.backgroundImage}
    //   imageStyle={{opacity:0.5}}
    // >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fbfbfb'}}>
      <Text
      style={textStyles.loginHeader}
      >Assessment
      </Text>
      <Image 
        source={require('../assets/images/assessment.png')} 
        style={{width: 370, height: 182, }}
        resizeMode="cover"
      />        
      <Pressable
        onPress={handleNewAssessment}>
          <Text
          style={{width: 260, textAlign: 'center', fontSize: 15, color: 'black', marginTop: 15, padding: 10, paddingLeft: 20, paddingRight: 20, margin: 5, backgroundColor: '#f7d1d8', borderRadius: 5, overflow: 'hidden'}}
          >Start New Assessment</Text>
        </Pressable>
        <Pressable
          onPress={handleContinueAssessment}>
          <Text
          style={{width: 260, textAlign: 'center', fontSize: 15, color: 'black', padding: 10, paddingLeft: 20, paddingRight: 20, margin: 5, backgroundColor: '#f4bbc9', borderRadius: 5, overflow: 'hidden'}}
          >Continue Previous Assessment</Text>
        </Pressable>
        <Pressable
          onPress={handleViewResults}>
          <Text
          style={{width: 260, textAlign: 'center', fontSize: 15, color: 'black', padding: 10, paddingLeft: 20, paddingRight: 20, margin: 5, backgroundColor: '#f6a6bb', borderRadius: 5, overflow: 'hidden'}}
          >View Results</Text>
        </Pressable>
        {/* <Button
          title="Continue previous assessment"
          onPress={handleContinueAssessment}
        />
        <Button
          title="View Results"
          onPress={handleViewResults}
        /> */}
        <View style={{paddingLeft:30, paddingRight: 30, marginTop: 20}}>
          <Text
          style={textStyles.paragraph}
          >Before I do  consists of 4 parts. Please complete the inventory by checking all items to get your correct relationship report.
          </Text> 
        </View>

        
        
      </View>
    // </ImageBackground>
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

export default AssessmentScreen;
