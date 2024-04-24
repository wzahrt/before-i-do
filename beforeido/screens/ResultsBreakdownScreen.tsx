import React, { useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, BackHandler} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { Pressable } from 'react-native';
import { textStyles } from '../TextStyles';
import { UserDocument, fetchData } from '../userData';
import firestore from '@react-native-firebase/firestore';
import BarChart from '../components/BarChart';
// import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from "victory-native";

type ResultsBreakdownScreenProps = NativeStackScreenProps<RootStackParamList, "ResultsBreakdown">;
let currentUser;
let coupleCode = '';
let AsetLoading = true;

let partnerid;

console.log("BEGIN LOG --------------------------------------------------")

async function fetchPartnerData(coupleCode: string, currentUser: string): Promise<string> {
  const querySnapshot = await firestore()
    .collection(`users`)
    .where('coupleCode', '==', coupleCode)
    .get()
    .then((qsnapshot) => {
        qsnapshot.forEach((doc) => {
            // console.log(doc.id);
            if(doc.id != currentUser) {
                partnerid = doc.id;
                // console.log("partnerid: " + partnerid);
            }
        });
    });     
  return "success";
 
  // AsetLoading = false;
}

var query: ResponseDocument;
var query1: ResponseDocument;
let helper;

let subCatsCouple = ['Harmony and Cooperation', 'Relationship Challenges'];
let subCatsCultural = ['Lifestyle', 'Marriage Preparations', 'Spiritual Beliefs', 'Traditions'];
let subCatsFamily = ['Family Closeness', 'Family-Partner Relationships', 'Parental Marital Relationship'];
let subCatsPersonality = ['Emotional Stability', 'Empathy', 'Openness to Experience', 'Secure Attachment', 'Self-Confidence'];

interface ResponseDocument {
  "PERSONALITY DYNAMICS": personality,
  "FAMILY DYNAMICS": family,
  "COUPLE RELATIONSHIP DYNAMICS": couple,
  "CULTURAL DYNAMICS": cultural
  
};

interface personality {
  "Emotional Stability": number[],
  "Empathy": number[],
  "Openness to Experience": number[],
  "Secure Attachment": number[],
  "Self-Confidence": number[]
};

interface couple {
  "Harmony and Cooperation": number[],
  "Relationship Challenges": number[]
};

interface cultural {
  "Lifestyle": number[],
  "Marriage Preparations": number[],
  "Spiritual Beliefs": number[],
  "Traditions": number[]
};

interface family {
  "Family Closeness": number[],
  "Family-Partner Relationships": number[],
  "Parental Marital Relationship": number[]
};

var final: ResponseDocument;
async function fetchResponseHelper(uid: string): Promise<ResponseDocument> {
  let personalityRes: personality;
  let coupleRes: couple;
  let culturalRes: cultural;
  let familyRes: family;
  
  await firestore().collection(`users/${uid}/questionnaire`).get()
    .then(response => {
      response.forEach(document => {
        // console.log(typeof(document.data()));
        // console.log(document.id);
        if(document.id == 'PERSONALITY DYNAMICS') {
          personalityRes = document.data() as personality;
          // responseDocument['PERSONALITY DYNAMICS'] = document.data() as personality;

        }
        if(document.id == 'COUPLE RELATIONSHIP DYNAMICS') {
          coupleRes = document.data() as couple;
          // responseDocument['COUPLE RELATIONSHIP DYNAMICS'] = coupleRes;
        }
        if(document.id == 'CULTURAL DYNAMICS') {
          culturalRes = document.data() as cultural;
          // responseDocument['CULTURAL DYNAMICS'] = culturalRes;
        }
        if(document.id == 'FAMILY DYNAMICS') {
          familyRes = document.data() as family;
          // responseDocument['FAMILY DYNAMICS'] = familyRes;
        }
      });
      const responseDocument = {
        "PERSONALITY DYNAMICS": personalityRes,
        "COUPLE RELATIONSHIP DYNAMICS": coupleRes,
        "CULTURAL DYNAMICS": culturalRes,
        "FAMILY DYNAMICS": familyRes
      };
      final = responseDocument as ResponseDocument;
      // console.log("final: ", final);
      return final;
    });
  
  return final;
  // return 'success';
  
}

async function fetchResponses(): Promise<string> {

  await fetchData().then((user) => {
    currentUser = user.uid;
    coupleCode = user.coupleCode;
    // currentEmail = user.email;
    // console.log(coupleCode);
  });
  // console.log("ner");
  query = await fetchResponseHelper(currentUser);
  // console.log("yup");
  // console.log("query: " + query);
  await fetchPartnerData(coupleCode, currentUser);
  // console.log("yup yup");

  console.log("partnerid: " + partnerid);

  query1 = await fetchResponseHelper(partnerid);
  // console.log("yup yup yup");
  // console.log("query1: " + query1);
  // AsetLoading = false;
  return "success";
}

const ResultsBreakdownScreen: React.FC<ResultsBreakdownScreenProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(query);
  const [response1, setResponse1] = useState(query1);
  const [category, setCategory] = useState('PERSONALITY DYNAMICS');
  const [responseData, setResponseData] = useState(Object.create(null));

  
  useEffect(() => {
    console.log("Fetching user data...");
    fetchResponses().then(() => {
      console.log("Finished fetching user data.");
      // console.log("query1: " + query1.data());
      // setLoading(false);
      
      const currentData = Object.create(null);
      currentData['user1'] = [];
      currentData['user2'] = [];

      if(query != undefined && query1 != undefined) {
        console.log("stuff is loaded now");
        setResponse(query);

        let temp = [];
        Object.entries(query[category]).forEach(([key, value]) => {
          console.log(key, value);
          let average = value.reduce((a, b) => a + b, 0) / value.length;
          // currentData['user1'] = [{x: key, y: average}];
          temp.push({x: key, y: average});
          // console.log("here: ", currentData['user1']);
        });
        currentData['user1'] = temp;
        
        let temp1 = [];
        setResponse1(query1);
        Object.entries(query1[category]).forEach(([key, value]) => {
          // console.log(key, value);
          let average = value.reduce((a, b) => a + b, 0) / value.length;
          // currentData['user2'] = [{x: key, y: average}];
          temp1.push({x: key, y: average});
        });
        currentData['user2'] = temp1;
        
        // console.log("query1: " + query1['PERSONALITY DYNAMICS']['Emotional Stability']);
        // console.log("query: ", query);
        // console.log("query1: ", query1);
        // console.log("current data: ", currentData['user2']);
        setResponseData(currentData);

      }

    setLoading(false);
    });

    console.log("response data: ", responseData);

    // console.log("inside of use effect: ", query);
    // console.log("inside of use effect: ", query1);
  }
  , []);

  

  const handleNext = () => { 
    // updates section and responses
    console.log("Next button pressed");
    const currentData = Object.create(null);
    currentData['user1'] = [];
    currentData['user2'] = [];

    let nextCategory = '';
    
    if (category == 'CULTURAL DYNAMICS') {
      props.navigation.navigate('HomePage');
      return;
    }
    else if (category == 'PERSONALITY DYNAMICS') {
      setCategory('FAMILY DYNAMICS');
      nextCategory = 'FAMILY DYNAMICS';
    }
    else if (category == 'FAMILY DYNAMICS') {
      setCategory('COUPLE RELATIONSHIP DYNAMICS');
      nextCategory = 'COUPLE RELATIONSHIP DYNAMICS';
    }
    else if (category == 'COUPLE RELATIONSHIP DYNAMICS') {
      setCategory('CULTURAL DYNAMICS');
      nextCategory = 'CULTURAL DYNAMICS';
    }
    
    let temp = [];
    Object.entries(query[nextCategory]).forEach(([key, value]) => {
      console.log(key, value);
      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user1'] = [{x: key, y: average}];
      temp.push({x: key, y: average});
      // console.log("here: ", currentData['user1']);
    });
    currentData['user1'] = temp;
    
    let temp1 = [];
    setResponse1(query1);
    Object.entries(query1[nextCategory]).forEach(([key, value]) => {
      // console.log(key, value);
      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user2'] = [{x: key, y: average}];
      temp1.push({x: key, y: average});
    });
    currentData['user2'] = temp1;

    setResponseData(currentData);

    console.log("current data: ", currentData['user1']);
    console.log("current data: ", currentData['user2']);    

  }

  const handlePrevious = () => { 
    // updates section and responses
    console.log("Next button pressed");
    const currentData = Object.create(null);
    currentData['user1'] = [];
    currentData['user2'] = [];

    let prevCategory = '';
    
    if (category == 'PERSONALITY DYNAMICS') {
      props.navigation.navigate('Results');
      return;
    }
    else if (category == 'FAMILY DYNAMICS') {
      setCategory('PERSONALITY DYNAMICS');
      prevCategory = 'PERSONALITY DYNAMICS';
    }
    else if (category == 'COUPLE RELATIONSHIP DYNAMICS') {
      setCategory('FAMILY DYNAMICS');
      prevCategory = 'FAMILY DYNAMICS';
    }
    else if (category == 'CULTURAL DYNAMICS') {
      setCategory('COUPLE RELATIONSHIP DYNAMICS');
      prevCategory = 'COUPLE RELATIONSHIP DYNAMICS';
    }

    
    let temp = [];
    Object.entries(query[prevCategory]).forEach(([key, value]) => {
      console.log(key, value);
      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user1'] = [{x: key, y: average}];
      temp.push({x: key, y: average});
      // console.log("here: ", currentData['user1']);
    });
    currentData['user1'] = temp;
    
    let temp1 = [];
    setResponse1(query1);
    Object.entries(query1[prevCategory]).forEach(([key, value]) => {
      // console.log(key, value);
      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user2'] = [{x: key, y: average}];
      temp1.push({x: key, y: average});
    });
    currentData['user2'] = temp1;

    setResponseData(currentData);

    console.log("current data: ", currentData['user1']);
    console.log("current data: ", currentData['user2']);    

  }




  return (
    <ImageBackground
      // source={require('../assets/images/report.png')}
      style={styles.backgroundImage}
    >
      <View style={{ alignItems: 'center', marginTop: 100, marginHorizontal:20 }}>

        <Text>Results Breakdown</Text>


        {loading ? ( // This lets us have a loading page, but it's so fast you can't even see it lmao. WE NEED THIS
          <Text>Loading...</Text>
        ) : (
          <>
            {/* print each item in responseData, for both user1 and user2 */}
            <Text></Text>
            <Text></Text>
            <Text>{category}</Text>
            <Text></Text>
            <Text>You</Text>
            <Text>
              {responseData['user1'].map((item) => {
                return <Text>{item.x}: {item.y} </Text>
              })
              }
            </Text>
            <Text></Text>
            <Text>Your Partner</Text>
            <Text>
              {responseData['user1'].map((item) => {
                return <Text>{item.x}: {item.y} </Text>
              })
              }
            </Text>
            {/* <Text>{responseData.}</Text> */}
            {/* <Text>{response['PERSONALITY DYNAMICS']['Emotional Stability']}</Text> */}
            {/* <Text>{query1['PERSONALITY DYNAMICS']['Emotional Stability']}</Text> */}
            {/* <Text>{response['PERSONALITY DYNAMICS']['Empathy']}</Text> */}
          </>
        )}

      </View>
      <View style={{ flexDirection: 'row', justifyContent:'center', marginTop: 200 }}>
        <Pressable
          onPress={handlePrevious}
          style={textStyles.button}
          backgroundColor='lightblue'
        >
          <Text>
            Previous
          </Text>

        </Pressable>
        <View style={{ width: 20 }}></View>
        <Pressable
          onPress={handleNext}
          style={textStyles.button}
          backgroundColor='lightblue'
        >
          <Text>
            {category == 'CULTURAL DYNAMICS' ? 'Home' :
              'Next'}
          </Text>

        </Pressable>
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

export default ResultsBreakdownScreen;