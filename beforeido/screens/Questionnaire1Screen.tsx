import {useEffect, useState} from 'react';
import React from 'react'; 
import {Text, Button, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList
import { textStyles } from '../TextStyles';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import questionsData from '../questionnaire_en.json';

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


type Questionnaire1ScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire1">;

const Questionnaire1Screen: React.FC<Questionnaire1ScreenProps> = (props, navigation) => {
  const [sliderValue1, setSliderValue1] = useState(5);  // Save all slider values 
  const [sliderValue2, setSliderValue2] = useState(5);
  const [sliderValue3, setSliderValue3] = useState(5);
  const [sliderValue4, setSliderValue4] = useState(5);
  const [sliderValue5, setSliderValue5] = useState(5);

  var nextQuestion: number = 1; // In the future, get this value from the database
  const loading = false; 

  // const [questions, setQuestions] = useState<string[]>([]); // Save the questions from database - determine if we're loading or not
  // const [loading, setLoading] = useState(true);
  
  // const smallestQuestion = 1; // Only values that need to be changed between screens
  // const largestQuestion = 5; 

  // useEffect(
  //   () => { // We're going to use this effect in the code because reactNative won't let us use async otherwise
  //     async function fetchData() {  // Fetching data from firestore... 
  //       try {
  //         const querySnapshot = await firestore()
  //           .collection('questions')
  //           .where('questionNumber', '>=', smallestQuestion)
  //           .where('questionNumber', '<=', largestQuestion)
  //           .get();
          
  //         const fetchedQuestions: string[] = [];
  //         querySnapshot.forEach((doc) => {
  //           const question = doc.data().question;
  //           fetchedQuestions.push(question);
  //         });
  
  //         setQuestions(fetchedQuestions); // By using setQuestions and setLoading, we can change these values past their inital establishment!! 
  //         setLoading(false);
  //       } catch (error) {
  //         console.error('Error getting documents: ', error);
  //       }
  //     }
        
  //     fetchData(); // Calling the function we just made... 
  //   }, []); // Everything before this was the first parameter of useEffect, and [] is the second.   


  return (
    <ImageBackground
      //source={require('../assets/images/first_page.png')}
      source={require('../assets/images/blank_page.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={textStyles.heading}>Personality Dynamics</Text>

        {loading ? ( // This lets us have a loading page, but it's so fast you can't even see it lmao. WE NEED THIS
          <Text>Loading...</Text>
        ) : (
          <>

          <Text style={textStyles.text}>{questions[0].question}</Text>
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

          <Text style={textStyles.text}>{questions[1].question}</Text>
          <Text style={textStyles.text}>{sliderValue2}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue2}
            onValueChange={(value) => setSliderValue2(value)}
          />

          <Text style={textStyles.text}>{questions[2].question}</Text>
          <Text style={textStyles.text}>{sliderValue3}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue3}
            onValueChange={(value) => setSliderValue3(value)}
          />

          <Text style={textStyles.text}>{questions[3].question}</Text>
          <Text style={textStyles.text}>{sliderValue4}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue4}
            onValueChange={(value) => setSliderValue4(value)}
          />

          <Text style={textStyles.text}>{questions[4].question}</Text>
          <Text style={textStyles.text}>{sliderValue5}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={1}
            value={sliderValue5}
            onValueChange={(value)=>setSliderValue5(value)}
          />
          </>
        )}

        <Pressable 
          // We're going to want this to navigate us to change the 'next question' value
          onPress={() => props.navigation.push('Assessment')}
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
