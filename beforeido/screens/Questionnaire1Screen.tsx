import React, {useState} from 'react';
import {Text, Button, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList
import { textStyles } from '../TextStyles';
import Slider from '@react-native-community/slider';


type Questionnaire1ScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire1">;
const Questionnaire1Screen: React.FC<Questionnaire1ScreenProps> = (props, navigation) => {
  const [sliderValue1, setSliderValue1] = useState(5);

  return (
    <ImageBackground
      source={require('../assets/images/first_page.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={textStyles.text}>Personality Dynamics</Text>
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
    top: 250, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

});

export default Questionnaire1Screen;
