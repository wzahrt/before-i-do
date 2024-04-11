import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { fetchData } from '../userData.tsx'; 
import firestore from '@react-native-firebase/firestore';



type AssessmentScreenProps = NativeStackScreenProps<RootStackParamList, "Assessment">;

let uid: null | string;
fetchData().then((user) => {
  uid = user.uid;
});


const AssessmentScreen: React.FC<AssessmentScreenProps> = (props) => {
  const handleNewAssessment = () => {
    // GIVEN: User info 
    // RETURN: none 
    // EFFECT: change navigation to move us to first questionnaire page, cleanse previous results
        
    // TODO 0: Clear questionnaire results 
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
    
    
    // TODO 1: update curSection
    // console.log(uid);
    firestore().collection('users').doc(uid).update({curSection: 1}).catch(error => {
      console.log("Error updating curSection:", error);
    }
    );

    
    // TODO 2: Push to questionnaire 1  
    console.log("ENTERING QUESTIONNAIRE")
    props.navigation.push('Questionnaire1');
  };

  const handleContinueAssessment = () => {
    // GIVEN: User info 
    // RETURN: none 
    // EFFECT: change navigation to move us to most recently unanswered page
    
    // TODO 0: Determine user 
    // TODO 1: Determine most recently unanswered question 
    // TODO 2: Push to corresponding question 
    
    props.navigation.push('Questionnaire1');
  };

  const handleViewResults = () => {
    // GIVEN: User info 
    // RETURN: none 
    // EFFECT: change navigation to move us to results page if valid
    
    // TODO 0: Determine user 
    // TODO 1: Determine if all questions are answered by user 
    // TODO 2: Determine if all questions are answered by partner (couple code)
    // TODO 3: If yes to everything before, push to results page 
    // TODO 4: Else, throw error and remain on page 
    
    props.navigation.push('Signup');
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
