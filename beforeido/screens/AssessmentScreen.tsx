import { React, useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { fetchData } from '../userData.tsx'; 
import { fetchCoupleData } from '../coupleData.tsx';
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
    console.log("Testing if they can enter questionnnaire")

     // Test for partner, push to questionnaire
    if(canTakeAssessment()) {
      console.log("Entering questionnaire");

      console.log("User 1: ", coupleData.user1); 
      console.log("User 2: ", coupleData.user2); 
      console.log("User 1 Done: ", coupleData.user1Done); 
      console.log("User 2 Done: ", coupleData.user2Done);   

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
    console.log("Testing if they can enter questionnnaire")
    if(canTakeAssessment()) {
      console.log("Entering questionnaire")
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
    console.log("Testing if they can enter results")
    if(canViewResults()) {
      console.log("Entering results")
      props.navigation.push('Results');
    } else Alert.alert("You and your partner must both complete the assessment before we can look at results!")

  };

  return (
    <ImageBackground
      source={require('../assets/images/relationship_dynamics.png')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Assessment Screen</Text> 
        <Button
          title="Begin new assessment"
          onPress={handleNewAssessment}
        />
        <Button
          title="Continue previous assessment"
          onPress={handleContinueAssessment}
        />
        <Button
          title="View Results"
          onPress={handleViewResults}
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

export default AssessmentScreen;
