import {useEffect, useState} from 'react';
import React from 'react'; 
import {Text, Button, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList
import { textStyles } from '../TextStyles';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import questionsData from '../questionnaire_en.json';
import auth from '@react-native-firebase/auth';
import { fetchData } from '../userData.tsx'; 



console.log("BEGIN LOG --------------------------------------------------")


interface Question {
  category: string; 
  subcategory: string; 
  questionNumber: number;
  question: string;
}

const questions: Question[] = questionsData.questions.map(item => ({
  category: item.category,
  subcategory: item.subcategory,
  questionNumber: item.questionNumber,
  question: item.question
}));

let questionAnswers: number[] = []; 

type Questionnaire1ScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire1">;

const Questionnaire1Screen: React.FC<Questionnaire1ScreenProps> = (props, navigation) => {
  const [sliderValue1, setSliderValue1] = useState(5);  // Save all slider values 
  const [loading, setLoading] = useState(true);
  const [nextQuestion, setNextQuestion] = useState(1); 
  const [category, setCategory] = useState('Personality Dynamics');

  let currentUserID: null | string;
  

  // This works, but still makes multiple calls
  fetchData().then((user) => {
    currentUserID = user.uid;
    setLoading(false); 
    
    if (user?.curSection == 2) { 
      setNextQuestion(35); 
      setCategory('Family Dynamics');
    } else if (user?.curSection == 3) { 
      setNextQuestion(68); 
      setCategory('Couple Relationship Dynamics');
    } else if (user?.curSection == 4) { 
      setNextQuestion(114); 
      setCategory('Cultural Dynamics');
    }


    console.log('Couple Code:', user.coupleCode);
    console.log('Current Section:', user.curSection);
    console.log('Email:', user.email);
    console.log('First Name:', user.firstName);
    console.log('Last Name:', user.lastName);
    console.log('Password:', user.password);
  }).catch((error) => {
    console.error('Error fetching user data:', error);
  });




  const handleNext = () => { 
    console.log("Moved into handle next"); // Tests 
    console.log("Next Question: ", nextQuestion);
    console.log("Question Answers: ", questionAnswers);


    questionAnswers.push(sliderValue1); // Append answer to array 

    setNextQuestion(nextQuestion + 1); 

    if (nextQuestion == 35 || nextQuestion == 68 || nextQuestion == 112) { // If we are going to a new section ...
      console.log("Moved into new section if statement");
      console.log("Next Question: ", nextQuestion);
      console.log("Question Answers: ", questionAnswers);
      
      // Update subcollection with new values 
      firestore().collection('users').doc(currentUserID).collection('questionnaire').doc(category).set({
        questionAnswers: questionAnswers,
      }).then(() => {
        console.log("Questionnaire answers added ", questionAnswers);
      }).catch((e) => {
        console.log('Error adding questionnaire answers:', e);
      });

      questionAnswers = []; // Reset questionAnswers 

      // Update curSection 
      firestore().collection('users').doc(currentUserID).update({
        // curSection: nextQuestion == 35 ? 2 : nextQuestion == 68 ? 3 : 4,
        curSection: 2,
      }).then(() => {
        console.log("CurSection updated");
      }).catch((e) => {
        console.log('Error updating curSection:', e);
      });

    }

    console.log("Leaving Handle Next"); // Tests 
    console.log("Next Question: ", nextQuestion);
    console.log("Question Answers: ", questionAnswers);

  }

  return (
    <ImageBackground
      //source={require('../assets/images/first_page.png')}
      source={require('../assets/images/blank_page.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={textStyles.heading}>{category}</Text>

        {loading ? ( // This lets us have a loading page, but it's so fast you can't even see it lmao. WE NEED THIS
          <Text>Loading...</Text>
        ) : (
          <>

          <Text style={textStyles.text}>{questions[nextQuestion - 1].question}</Text>
          <Text style={textStyles.text}>{sliderValue1}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue1}
            onValueChange={(value) => setSliderValue1(value)}
          />

          </>
        )}

        <Pressable 
          // We're going to want this to navigate us to change the 'next question' value
          onPress={handleNext}
          style={textStyles.button}
          > 
          <Text>Continue</Text> 
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20, 
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

});

export default Questionnaire1Screen;


  // console.log("Moving into useEffect with \nloading: ", loading, "\nnextQuestion: ", nextQuestion)

  // useEffect(() => { // Maybe move this out ... 
  //   async function fetchData() {
  //     try {
  //       const querySnapshot = await firestore()
  //         .collection('users')
  //         .where('email', '==', currentUser.email)
  //         .get();
  
  //       if (querySnapshot.empty) {
  //         console.log("No documents found for current user");
  //         setLoading(false); // Update loading state
  //         return; // Exit early if no documents found
  //       }
  
  //       let curSection;
  
  //       querySnapshot.forEach((doc) => {
  //         curSection = doc.data().curSection;
  //       }); 
  
  //       // Move the logic dependent on curSection here
  //       if (curSection === undefined) {
  //         console.log("curSection is still undefined");
  //         return; // Exit early if curSection is undefined
  //       }
  
  //       if (curSection == 1) {
  //         console.log("Current section is 1");
  //         // Add your logic for section 1 here
  //       }
  //       else if (curSection == 2) {
  //         console.log("Current section is 2");
  //         // Add your logic for section 2 here
  //         nextQuestion = 35; 
  //       }
  //       else if (curSection == 3) {
  //         console.log("Current section is 3");
  //         // Add your logic for section 3 here
  //         nextQuestion = 68; 
  //       }
  //       else if (curSection == 4) {
  //         console.log("Current section is 4");
  //         // Add your logic for section 4 here
  //         nextQuestion = 112;
  //       }
  //       else {
  //         console.log("No matching section found:", curSection);
  //         // Add logic for handling when no matching section is found
  //       }

  //       setLoading(false);
  
  //     } catch (error) {
  //       console.error('Error getting documents: ', error);
  //     }
  //   }
  
  //   fetchData();


  // }, []);