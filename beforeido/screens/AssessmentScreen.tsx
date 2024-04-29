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
  const [coupleCode, setCoupleCode] = useState(0);
  const [user1, setUser1] = useState(""); 
  const [user1Done, setUser1Done] = useState(false); 
  const [user2, setUser2] = useState<string | null>(""); 
  const [user2Done, setUser2Done] = useState<boolean | null>(false); 


  useEffect(() => {
    fetchData().then((user) => {
      uid = user?.uid, 
      setCoupleCode(user.coupleCode)

      console.log("CoupleCode: ", coupleCode)
    });

    fetchCoupleData(coupleCode).then((couple) => { 
      setUser1(couple.user1); 
      setUser1Done(couple.user1Done); 
      setUser2(couple.user2); 
      setUser2Done(couple.user2Done);

      console.log("Inside fetch - inside useEffect"); 
      console.log("User 1: ", user1); 
      console.log("User 2: ", user2); 
      console.log("User 1 Done: ", user1Done); 
      console.log("User 2 Done: ", user2Done); 
      
    })

    console.log("Outside fetch - inside useEffect")
    console.log("User 1: ", user1); 
    console.log("User 2: ", user2); 
    console.log("User 1 Done: ", user1Done); 
    console.log("User 2 Done: ", user2Done);  

  }
  , []);


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

      console.log("User 1: ", user1); 
      console.log("User 2: ", user2); 
      console.log("User 1 Done: ", user1Done); 
      console.log("User 2 Done: ", user2Done);  

      props.navigation.push('Questionnaire1');
    } else { 
      Alert.alert("You need a partner with a matching couple code to proceed!"); 
    }
  };

  const canTakeAssessment = () : Boolean => { 
    
    if(user2 != null) return true; 
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
    if(user2 == null) return false; 
    if(user1Done == false) return false; 
    if(user2Done == false) return false; 
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
