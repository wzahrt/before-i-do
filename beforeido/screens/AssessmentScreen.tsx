import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App

type AssessmentScreenProps = NativeStackScreenProps<RootStackParamList, "Assessment">;

const AssessmentScreen: React.FC<AssessmentScreenProps> = (props) => {
  const handleNewAssessment = () => {
    // GIVEN: User info 
    // RETURN: none 
    // EFFECT: change navigation to move us to first questionnaire page, cleanse previous results
    
    // TODO 0: Determine user 
    // TODO 1: Clear questionnaire results 
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
    
    props.navigation.push('Signup');
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
