import React, {useState} from 'react';
import {Text, Button, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList
import { textStyles } from '../TextStyles';
import Slider from '@react-native-community/slider';


type Questionnaire1ScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire1">;
const Questionnaire1Screen: React.FC<Questionnaire1ScreenProps> = (props, navigation) => {
  const [sliderValue1, setSliderValue1] = useState(5);
  const [sliderValue2, setSliderValue2] = useState(5);
  const [sliderValue3, setSliderValue3] = useState(5);
  const [sliderValue4, setSliderValue4] = useState(5);
  const [sliderValue5, setSliderValue5] = useState(5);

  const q1 = "Potential Question 1"
  const q2 = "Potential Question 2"
  const q3 = "Potential Question 3"
  const q4 = "Potential Question 4"
  const q5 = "Potential Question 5"


  return (
    <ImageBackground
      //source={require('../assets/images/first_page.png')}
      source={require('../assets/images/blank_page.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={textStyles.heading}>Personality Dynamics</Text>
        <Text style={textStyles.text}>{q1}</Text>
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
        <Text style={textStyles.text}>{q2}</Text>
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
        <Text style={textStyles.text}>{q3}</Text>
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
        <Text style={textStyles.text}>{q4}</Text>
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
        <Text style={textStyles.text}>{q5}</Text>
        <Text style={textStyles.text}>{sliderValue5}</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValue5}
          onValueChange={(value) => setSliderValue5(value)}
        />
        <Pressable 
          // We're going to want this to navigate us to the next page, not just to Assessment
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
