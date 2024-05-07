import {useEffect, useState} from 'react';
import React from 'react'; 
import {Text, Button, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList
import { textStyles } from '../TextStyles';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import questionsData from '../questionnaire_turkish.json';
import auth from '@react-native-firebase/auth';
import { fetchData } from '../userData.tsx'; 
import * as Progress from 'react-native-progress';



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
let startingCategory = 'BİREYSEL DİNAMİKLER';
let AsetLoading = true;

let userinfo = null;

type Questionnaire1ScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire1">;

const Questionnaire1Screen: React.FC<Questionnaire1ScreenProps> = (props, navigation) => {
  const [sliderValue1, setSliderValue1] = useState(1);  // Save all slider values 
  const [loading, setLoading] = useState(AsetLoading);
  const [nextQuestion, setNextQuestion] = useState(1);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [coupleCode, setCoupleCode] = useState(""); 
  const [userEmail, setUserEmail] = useState(""); 


  useEffect(() => {
    fetchData().then((user) => {
      currentUserID = user.uid;
      userinfo = user;
      startingQuestion = user?.curSection == 2 ? 
        36 : user?.curSection == 3 ?
        69 : user?.curSection == 4 ? 
        113 : user?.curSection == 5 ? 
        141 : 1;
      setCoupleCode(user.coupleCode); 
      setUserEmail(user.email); 
      setNextQuestion(startingQuestion);
      setCategory(questions[startingQuestion-1].category);
      setSubcategory(questions[startingQuestion-1].subcategory);
      console.log("Starting Question: ", startingQuestion);
      console.log("Current Section: ", user?.curSection);
      setLoading(false);
    });
  }
  , []);


  if(nextQuestion == 1) {
    questionAnswers = [];
    subcategories = [];
  }

  const handleNext = () => { 
    console.log("Moved into handle next"); // Tests 

    setNextQuestion(nextQuestion + 1); 
    setCategory(questions[nextQuestion].category); // Update category

    if(nextQuestion == 140) { // If we are at the end of the questionnaire
      questionAnswers[(subcategories.length-1)].push(sliderValue1);
      let data = Object.create(null);
      for (let i = 0; i < subcategories.length; i++) {
        data[subcategories[i]] = questionAnswers[i];
      };
      // data['coupleCode'] = userinfo.coupleCode;
      
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

      // Update user1 or user2 done 
      const coupleCodeRef = firestore().collection('coupleCode').doc(coupleCode); 
      
      coupleCodeRef.get() // Get the document
          .then((doc) => {
              if (doc.exists) { // If so, check which use we are 
                if (doc.data().user1 == userEmail) {
                  coupleCodeRef.update("user1Done", true); 
                } else {
                  coupleCodeRef.update("user2Done", true)
                }} 
              else {  // If not, add new coupleCode document with this user
                console.log("User doesn't exist in coupleCode collection")
              }
          })
          .catch((error) => {
              console.log("Error getting document:", error);
          });

      props.navigation.push('HomePage');
      return;
    }
    if (nextQuestion == 141) {
      props.navigation.push('HomePage');
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
    setSliderValue1(1);


    console.log("Next Question: ", nextQuestion+1);
    console.log("Question Answers: ", questionAnswers);

    let data = Object.create(null);

    if (nextQuestion == 35 || nextQuestion == 68 || nextQuestion == 112) { // If we are going to a new section ...
      console.log("Moved into new section if statement");
      console.log("Next Question: ", nextQuestion+1);
      console.log("Question Answers: ", questionAnswers);
      
      // Update subcollection with new values, mapping each subcategory to its array of a
      //create hashmap of subcategories to their respective arrays
      for (let i = 0; i < subcategories.length; i++) {
        data[subcategories[i]] = questionAnswers[i];
      };
      // data['coupleCode'] = userinfo.coupleCode;
      
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
        curSection: nextQuestion == 35 ? 2 : nextQuestion == 68 ? 3 : nextQuestion == 112 ? 4:4,
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
        <Text style={textStyles.heading}>Anket Soruları{'\n'}</Text>
      </View>
      
      <View style={styles.container}>
        
        <Text style={textStyles.subheading}>{category}</Text>
        <Text style={textStyles.subheading}></Text>
        <Text style={textStyles.subheading}></Text>
        

        {loading ? ( // This lets us have a loading page, but it's so fast you can't even see it lmao. WE NEED THIS
          <Text>Loading...</Text>
        ) : (
          <>

          <Text style={{fontSize:16}}>{questions[nextQuestion-1].question}</Text>
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
              sliderValue1 == 1 ? 'Benim Cevabım: Çok Katılmıyorum' : 
              sliderValue1 == 2 ? 'Benim Cevabım: Katılmıyorum' : 
              sliderValue1 == 3 ? 'Benim Cevabım: Tarafsız' : 
              sliderValue1 == 4 ? 'Benim Cevabım: Katılıyorum' : 
              'Benim Cevabım: Çok Katılıyorum'

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
            {nextQuestion == 35 ? 'Sonraki Bölüm' : 
            nextQuestion == 68 ? 'Sonraki Bölüm' : 
            nextQuestion == 112 ? 'Sonraki Bölüm' : 
            nextQuestion == 140 ? 'Anketi Tamamlayın' : 
            nextQuestion == 141 ? 'Anketi Tamamlayın' : 
            'Sonraki Soru'}
            
          </Text> 
        </Pressable>
      </View>
      <Progress.Bar progress={nextQuestion/141} indeterminate={false} width={375} color='lightpink' borderRadius={0} animationType='spring'/>

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