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

let questionAnswers: number[][] = []; 
let subcategories: string[] = [];

let currentUserID: null | string;

let startingQuestion = 1;
let startingCategory = 'PERSONALITY DYNAMICS';
// let user = fetchData();
let AsetLoading = true;
// This works, but still makes multiple calls

function fetchUser() {
  fetchData().then((user) => {
  currentUserID = user.uid;
  AsetLoading = false;
  console.log("loading: ", AsetLoading);
  if (user?.curSection == 2) { 
    startingQuestion = 35;
    startingCategory = 'RELATIONSHIP DYNAMICS'
  } else if (user?.curSection == 3) { 
    startingQuestion = 68; 
    startingCategory = 'COUPLE RELATIONSHIP DYNAMICS';
  } else if (user?.curSection == 4) { 
    startingQuestion = 112; 
    startingCategory = 'CULTURAL DYNAMICS';
  } else if (user?.curSection == 5) {
    startingQuestion = 140;
    startingCategory = 'END OF QUESTIONNAIRE';
  }
  console.log("Current Section: ", user?.curSection);
  console.log("User: ", currentUserID);

  return currentUserID;
});
}

type Questionnaire1ScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire1">;

const Questionnaire1Screen: React.FC<Questionnaire1ScreenProps> = (props, navigation) => {
  const [sliderValue1, setSliderValue1] = useState(5);  // Save all slider values 
  const [loading, setLoading] = useState(AsetLoading);
  const [nextQuestion, setNextQuestion] = useState(startingQuestion); 
  const [category, setCategory] = useState(startingCategory);
  const [subcategory, setSubcategory] = useState(questions[nextQuestion-1].subcategory);


  const user = fetchUser();
  // console.log("loading: ", loading);

  if(nextQuestion == 1) {
    questionAnswers = [];
    subcategories = [];
  }
  console.log("category: ", category);

    // console.log('Couple Code:', user.coupleCode);
    // console.log('Current Section:', user.curSection);
    // console.log('Email:', user.email);
    // console.log('First Name:', user.firstName);
    // console.log('Last Name:', user.lastName);
    // console.log('Password:', user.password);


  const handleNext = () => { 
    console.log("Moved into handle next"); // Tests 
    // console.log("Next Question: ", nextQuestion);
    // console.log("Question Answers: ", questionAnswers);

    setNextQuestion(nextQuestion + 1); 
    setCategory(questions[nextQuestion].category); // Update category

    if(nextQuestion == 139) { // If we are at the end of the questionnaire
      questionAnswers[(subcategories.length-1)].push(sliderValue1);
      let data = Object.create(null);
      for (let i = 0; i < subcategories.length; i++) {
        data[subcategories[i]] = questionAnswers[i];
      };
      
      // console.log("here");
      firestore().collection('users').doc(currentUserID).collection('questionnaire').doc(category).set(
        data
      ).then(() => {
        console.log("Questionnaire answers added: ", data);
      }).catch((e) => {
        console.log('Error adding questionnaire answers:', e);
      });
      
      // Update curSection 
      firestore().collection('users').doc(currentUserID).update({
        curSection: 5,
      }).then(() => {
        console.log("CurSection updated");
      }).catch((e) => {
        console.log('Error updating curSection:', e);
      });

      questionAnswers = []; // Reset questionAnswers 
      subcategories = []; // Reset subcategories
      console.log("assessment completed")
      props.navigation.push('Assessment');
      return;
    }
    if (nextQuestion == 140) {
      props.navigation.push('Assessment');
      return;
    }

    setSubcategory(questions[nextQuestion].subcategory); // Update subcategory
    console.log("Subcategory: " + subcategory);


    if(subcategories.indexOf(subcategory) == -1) { // If subcategory is not in array
      subcategories.push(subcategory); // Append subcategory to array
      console.log("Subcategories: ", subcategories);
      questionAnswers.push([]); // Append empty array to questionAnswers
    }
    
    questionAnswers[(subcategories.length-1)].push(sliderValue1); // Append answer to array 
    setSliderValue1(5);


    console.log("Next Question: ", nextQuestion+1);
    console.log("Question Answers: ", questionAnswers);

    let data = Object.create(null);

    if (nextQuestion == 34 || nextQuestion == 68 || nextQuestion == 111) { // If we are going to a new section ...
      console.log("Moved into new section if statement");
      console.log("Next Question: ", nextQuestion+1);
      console.log("Question Answers: ", questionAnswers);
      
      // Update subcollection with new values, mapping each subcategory to its array of a
      //create hashmap of subcategories to their respective arrays
      for (let i = 0; i < subcategories.length; i++) {
        data[subcategories[i]] = questionAnswers[i];
      };
      
      // console.log("here");
      firestore().collection('users').doc(currentUserID).collection('questionnaire').doc(category).set(
        data
      ).then(() => {
        console.log("Questionnaire answers added: ", data);
      }).catch((e) => {
        console.log('Error adding questionnaire answers:', e);
      });
      
      // Update curSection 
      firestore().collection('users').doc(currentUserID).update({
        curSection: nextQuestion == 34 ? 2 : nextQuestion == 68 ? 3 : nextQuestion == 111 ? 4:4,
      }).then(() => {
        console.log("CurSection updated");
      }).catch((e) => {
        console.log('Error updating curSection:', e);
      });

      questionAnswers = []; // Reset questionAnswers 
      subcategories = []; // Reset subcategories
    }


    // console.log("Leaving Handle Next"); // Tests 
    // console.log("Next Question: ", nextQuestion);
    // console.log("Question Answers: ", questionAnswers);

  }

  return (
    <ImageBackground
      //source={require('../assets/images/first_page.png')}
      source={require('../assets/images/blank_page.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: 'center', paddingTop:50, backgroundColor:'lightpink'}}>
        <Text style={textStyles.heading}>Questionnaire{'\n'}</Text>
      </View>

      <View style={styles.container}>
        <Text style={textStyles.subheading}>{category}</Text>
        <Text style={textStyles.subheading}>{subcategory}</Text>
        <Text style={textStyles.subheading}></Text>
        

        {loading ? ( // This lets us have a loading page, but it's so fast you can't even see it lmao. WE NEED THIS
          <Text>Loading...</Text>
        ) : (
          <>

          <Text style={textStyles.text}>{questions[nextQuestion-1].question}</Text>
          <Text style={textStyles.subheading}></Text>
          
          <Slider
            style={{width: 250, height: 40}}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#bbbbbb"
            step={1}
            value={sliderValue1}
            thumbTintColor='lightpink'
            onValueChange={(value) => setSliderValue1(value)}
          />

          {/* map each slider value to a value from Strongly disagree to strongly agree */}
          <Text style={{fontSize:16}}>
            {
              sliderValue1 == 1 ? 'Response: Strongly Disagree' : 
              sliderValue1 == 2 ? 'Response: Disagree' : 
              sliderValue1 == 3 ? 'Response: Neutral' : 
              sliderValue1 == 4 ? 'Response: Agree' : 
              'Response: Strongly Agree'

            }
          </Text>

          </>
        )}

        
      </View>

      <View style={{ flex: 6, alignItems: 'center', justifyContent: 'top'}}>
      <Pressable 
          // We're going to want this to navigate us to change the 'next question' value
          onPress={handleNext}
          style={textStyles.button} 
          backgroundColor='lightblue'
          > 
          <Text>
            {nextQuestion == 34 ? 'Next Section' : 
            nextQuestion == 67 ? 'Next Section' : 
            nextQuestion == 111 ? 'Next Section' : 
            nextQuestion == 139 ? 'Complete Questionnaire' : 
            nextQuestion == 140 ? 'Complete Questionnaire' : 
            'Next Question'}
            
          </Text> 
        </Pressable>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 9,
    top: 0,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
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