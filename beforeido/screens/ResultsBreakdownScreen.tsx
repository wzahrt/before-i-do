import {useEffect, useState} from 'react';
import React from 'react'
import { Alert, View, Text, Modal, StyleSheet, ImageBackground, BackHandler, useWindowDimensions} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { Pressable } from 'react-native';
import { textStyles } from '../TextStyles';
import { UserDocument, fetchData } from '../userData';
import firestore from '@react-native-firebase/firestore';
// import BarChart from '../components/BarChart';
import { BarChart } from 'react-native-chart-kit';
import { Bar } from 'react-native-progress';
import { TextAlign } from '@shopify/react-native-skia';



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


interface ResponseDocument {
  "BİREYSEL DİNAMİKLER": personality,
  "AİLE DİNAMİKLERİ": family,
  "ÇİFT İLİŞKİSİ DİNAMİKLERİ": couple,
  "KÜLTÜREL DİNAMİKLER": cultural
  
};

interface personality {
  "Duygusal Kararlılık": number[],
  "Empati": number[],
  "Deneyime Açıklık": number[],
  "Özgüven": number[],
  "Güvenli bağlanma": number[]
};

interface couple {
  "Uyum ve işbirliği": number[],
  "İlişki zorlukları": number[]
};

interface cultural {
  "Manevi İnançlar": number[],
  "Yaşam tarzı": number[],
  "Gelenek/görenekler": number[],
  "Evlilik hazırlıklar": number[]
};

interface family {
  "Aile yakınlığı": number[],
  "Anne-baba evlilik ilişkisi": number[],
  "Aile-partner ilişkileri": number[]
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
        if(document.id == 'BİREYSEL DİNAMİKLER') {
          personalityRes = document.data() as personality;
          // responseDocument['PERSONALITY DYNAMICS'] = document.data() as personality;

        }
        if(document.id == 'ÇİFT İLİŞKİSİ DİNAMİKLERİ') {
          coupleRes = document.data() as couple;
          // responseDocument['COUPLE RELATIONSHIP DYNAMICS'] = coupleRes;
        }
        if(document.id == 'KÜLTÜREL DİNAMİKLER') {
          culturalRes = document.data() as cultural;
          // responseDocument['CULTURAL DYNAMICS'] = culturalRes;
        }
        if(document.id == 'AİLE DİNAMİKLERİ') {
          familyRes = document.data() as family;
          // responseDocument['FAMILY DYNAMICS'] = familyRes;
        }
      });
      const responseDocument = {
        "BİREYSEL DİNAMİKLER": personalityRes,
        "AİLE DİNAMİKLERİ": familyRes,
        "ÇİFT İLİŞKİSİ DİNAMİKLERİ": coupleRes,
        "KÜLTÜREL DİNAMİKLER": culturalRes
      };
      final = responseDocument as ResponseDocument;
      // console.log("final: ", final['BİREYSEL DİNAMİKLER']);
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
  console.log("query: " + query);
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
  const [category, setCategory] = useState('BİREYSEL DİNAMİKLER');
  const [userData, setUserData] = useState(Object.create(null));
  const [partnerData, setPartnerData] = useState(Object.create(null));

  const [modal0Visible, setModal0Visible] = useState(false); // Modal visibility variables
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  

  
  useEffect(() => {
    console.log("Fetching user data...");
    fetchResponses().then(() => {
      console.log("Finished fetching user data.");
      // console.log("query1: " + query1.data());
      // setLoading(false);
      

      if(query != undefined && query1 != undefined) {
        console.log("stuff is loaded now");
        setResponse(query);
        console.log("query: ", query);

        let temp = Object.create(null);
        temp['labels'] = [];
        temp['datasets'] = [{data: []}];
        Object.entries(query[category]).forEach(([key, value]) => {
          console.log("here");
          console.log(key, value);
          temp['labels'].push(key);
    
          let average = value.reduce((a, b) => a + b, 0) / value.length;
          // currentData['user1'] = [{x: key, y: average}];
          temp['datasets'][0].data.push(average);
          // console.log("here: ", currentData['user1']);
        });
        setUserData(temp);
        console.log("temp: ", temp);
        
        let temp1 = Object.create(null);
        temp1['labels'] = [];
        temp1['datasets'] = [{data: []}];
        setResponse1(query1);
        Object.entries(query1[category]).forEach(([key, value]) => {
          // console.log(key, value);
          temp1['labels'].push(key);
          let average = value.reduce((a, b) => a + b, 0) / value.length;
          // currentData['user2'] = [{x: key, y: average}];
          temp1['datasets'][0].data.push(average);
        });
        setPartnerData(temp1);
        console.log("temp1: ", temp1);
        // console.log("temp1 data: ", temp1['datasets'][0].data);
        
      }

    setLoading(false);
    });

  }
  , []);

  

  const handleNext = () => { 
    // updates section and responses
    console.log("Next button pressed");
    

    let nextCategory = '';
    
    if (category == 'KÜLTÜREL DİNAMİKLER') {
      props.navigation.navigate('HomePage');
      return;
    }
    else if (category == 'BİREYSEL DİNAMİKLER') {
      setCategory('AİLE DİNAMİKLERİ');
      nextCategory = 'AİLE DİNAMİKLERİ';
    }
    else if (category == 'AİLE DİNAMİKLERİ') {
      setCategory('ÇİFT İLİŞKİSİ DİNAMİKLERİ');
      nextCategory = 'ÇİFT İLİŞKİSİ DİNAMİKLERİ';
    }
    else if (category == 'ÇİFT İLİŞKİSİ DİNAMİKLERİ') {
      setCategory('KÜLTÜREL DİNAMİKLER');
      nextCategory = 'KÜLTÜREL DİNAMİKLER';
    }
    
    let temp = Object.create(null);
    temp['labels'] = [];
    temp['datasets'] = [{data: []}];
    Object.entries(query[nextCategory]).forEach(([key, value]) => {
      // console.log(key, value);
      temp['labels'].push(key);

      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user1'] = [{x: key, y: average}];
      temp['datasets'][0].data.push(average);
      // console.log("here: ", currentData['user1']);
    });
    setUserData(temp);
    console.log("temp: ", temp);
    
    let temp1 = Object.create(null);
    temp1['labels'] = [];
    temp1['datasets'] = [{data: []}];
    setResponse1(query1);
    Object.entries(query1[nextCategory]).forEach(([key, value]) => {
      // console.log(key, value);
      temp1['labels'].push(key);
      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user2'] = [{x: key, y: average}];
      temp1['datasets'][0].data.push(average);
    });
    setPartnerData(temp1);
    console.log("temp1: ", temp1);

    console.log("current data: ", userData);
    console.log("current data: ", partnerData);    

  }

  const handlePrevious = () => { 
    // updates section and responses
    console.log("Next button pressed");    

    let prevCategory = '';
    
    if (category == 'BİREYSEL DİNAMİKLER') {
      props.navigation.navigate('Results');
      return;
    }
    else if (category == 'AİLE DİNAMİKLERİ') {
      setCategory('BİREYSEL DİNAMİKLER');
      prevCategory = 'BİREYSEL DİNAMİKLER';
    }
    else if (category == 'ÇİFT İLİŞKİSİ DİNAMİKLERİ') {
      setCategory('AİLE DİNAMİKLERİ');
      console.log("here");
      prevCategory = 'AİLE DİNAMİKLERİ';
    }
    else if (category == 'KÜLTÜREL DİNAMİKLER') {
      setCategory('ÇİFT İLİŞKİSİ DİNAMİKLERİ');
      prevCategory = 'ÇİFT İLİŞKİSİ DİNAMİKLERİ';
    }

    
    let temp = Object.create(null);
    temp['labels'] = [];
    temp['datasets'] = [{data: []}];
    Object.entries(query[prevCategory]).forEach(([key, value]) => {
      console.log(key, value);
      temp['labels'].push(key);

      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user1'] = [{x: key, y: average}];
      temp['datasets'][0].data.push(average);
      // console.log("here: ", currentData['user1']);
    });
    setUserData(temp);
    console.log("temp: ", temp);
    
    let temp1 = Object.create(null);
    temp1['labels'] = [];
    temp1['datasets'] = [{data: []}];
    setResponse1(query1);
    Object.entries(query1[prevCategory]).forEach(([key, value]) => {
      // console.log(key, value);
      temp1['labels'].push(key);
      let average = value.reduce((a, b) => a + b, 0) / value.length;
      // currentData['user2'] = [{x: key, y: average}];
      temp1['datasets'][0].data.push(average);
    });
    setPartnerData(temp1);
    console.log("temp1: ", temp1);


  }


  return (
    console.log("response data", userData),
    
    <ImageBackground
      // source={require('../assets/images/report.png')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, paddingTop:40, backgroundColor:'lightpink'}}>
        <Text style={{fontSize: 20,fontWeight: 'bold', alignSelf: 'center'}}>{category}{'\n'}</Text>
        <Pressable onPress={() => 
          { 
            if(category == "BİREYSEL DİNAMİKLER") { 
              setModal0Visible(!modal0Visible)
            } else if (category == "AİLE DİNAMIKLERİ") { 
              setModal1Visible(!modal1Visible)
            } else if (category == "ÇİFT İLİŞKİSİ DİNAMİKLERİ") { 
              setModal2Visible(!modal2Visible)
            } else { 
              setModal3Visible(!modal3Visible)
            } 
          }} 
          style = {{marginTop: 12, marginLeft: 335, width: 30}}
          >
          <Text style = {{textAlign: 'right', fontWeight: 'bold', fontSize: 18}}> {"ⓘ"} </Text>
        </Pressable>

      </View>

      <View style={{ alignItems: 'center', marginTop: 15}}>


        {loading ? ( // This lets us have a loading page, but it's so fast you can't even see it lmao. WE NEED THIS
          <Text>Loading...</Text>
        ) : (
          <>
            {/* <Text>{category}</Text> */}
            {/* <Text></Text> */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal0Visible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModal0Visible(!modal0Visible);
                }}
             >
              <View style = {{alignItems: 'center', marginTop:96}}> 
                <ImageBackground
                    source={require('../assets/images/20.png')}
                    style={styles.tiledBackground}>
                </ImageBackground>
                  <Pressable
                    onPress={() => setModal0Visible(!modal0Visible)}
                    style={{padding: 10, marginTop: 425, backgroundColor: 'pink', borderRadius: 20}}>
                      <Text> Close </Text>
                    </Pressable>
              </View>
              </Modal>

              <Modal
              animationType="slide"
              transparent={true}
              visible={modal1Visible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModal1Visible(!modal1Visible);
                }}
             >
              <View style = {{alignItems: 'center', marginTop:96}}> 
                <ImageBackground
                    source={require('../assets/images/23.png')}
                    style={styles.tiledBackground}>
                </ImageBackground>
                  <Pressable
                    onPress={() => setModal1Visible(!modal1Visible)}
                    style={{padding: 10, marginTop: 425, backgroundColor: 'pink', borderRadius: 20}}>
                      <Text> Close </Text>
                    </Pressable>
              </View>
                

              </Modal>

              <Modal
              animationType="slide"
              transparent={true}
              visible={modal2Visible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModal2Visible(!modal2Visible);
                }}
             >
                <View style = {{alignItems: 'center', marginTop:96}}> 
                  <ImageBackground
                      source={require('../assets/images/26.png')}
                      style={styles.tiledBackground}>
                  </ImageBackground>
                    <Pressable
                      onPress={() => setModal2Visible(!modal2Visible)}
                      style={{padding: 10, marginTop: 425, backgroundColor: 'pink', borderRadius: 20}}>
                        <Text> Close </Text>
                      </Pressable>
                </View>
              </Modal>

              <Modal
              animationType="slide"
              transparent={true}
              visible={modal3Visible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModal3Visible(!modal3Visible);
                }}
             >
              <View style = {{alignItems: 'center', marginTop:96}}> 
                <ImageBackground
                    source={require('../assets/images/29.png')}
                    style={styles.tiledBackground}>
                </ImageBackground>
                  <Pressable
                    onPress={() => setModal3Visible(!modal3Visible)}
                    style={{padding: 10, marginTop: 425, backgroundColor: 'pink', borderRadius: 20}}>
                      <Text> Kapat </Text>
                    </Pressable>
              </View>
                

              </Modal>
            <Text style={{fontSize:16, fontWeight:'bold', paddingVertical: 5}}>Sen</Text>
            <BarChart
              data={userData}
              fromZero={true}   
              width={300}
              height={200}
              fromNumber={5}
              segments={5}
              xLabelsOffset={-12}
              yLabelsOffset={0}
              // showValuesOnTopOfBars={true}
              chartConfig={{
                barPercentage: .9,  
                decimalPlaces: 0,
                backgroundGradientFrom: "#eedddd",
                // backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#eedddd",
                // backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 5,
                },
                propsForLabels: {fontSize: 6},
              }}
              // verticalLabelRotation={20}
              style={{
                borderRadius: 10,
                paddingRight: 8,
                alignSelf: 'center'
              }}
            />

            <Text></Text>
            <Text style={{fontSize:16, fontWeight:'bold', paddingVertical: 5}}>Partnerin</Text>
            <BarChart
              data={partnerData}
              fromZero={true}   
              width={300}
              height={200}
              fromNumber={5}
              xLabelsOffset={-12}
              yLabelsOffset={0}
              segments={5}
              chartConfig={{
                barPercentage: .9,  
                decimalPlaces: 0,
                strokeWidth: 2,   
                backgroundGradientFrom: "#eedddd",
                // backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#eedddd",    
                color: (opacity = 1.5) => `rgba(0, 0, 255, ${opacity})`,
                style: {
                  borderRadius: 5.5,
                },
                propsForLabels: {fontSize: 6},
              }}
              style={{
                borderRadius: 10,
                paddingRight: 8,
                alignSelf: 'center'
              }}
            />
            
          </>
        )}

      </View>

    

      <View style={{ flexDirection: 'row', justifyContent:'center', marginBottom:10, marginTop:10}}>
        <Pressable
          onPress={handlePrevious}
          style={textStyles.button}
          backgroundColor='lightblue'
        >
          <Text>
          Önce
          </Text>

        </Pressable>
        <View style={{ width: 20 }}></View>
        <Pressable
          onPress={handleNext}
          style={textStyles.button}
          backgroundColor='lightblue'
        >
          <Text>
            {category == 'KÜLTÜREL DİNAMİKLER' ? 'Ana Ekran' :
              'Sonra'}
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
  tiledBackground: {
    flex: 2, 
    width: 350, 
    height: 470, 
    resizeMode: 'center',
    color: "pink",
  }
});

export default ResultsBreakdownScreen;
