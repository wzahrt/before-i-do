import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App
import { Pressable } from 'react-native';
import { textStyles } from '../TextStyles';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  return (
    <ImageBackground
      source={require('../assets/images/report.png')}
      style={styles.backgroundImage}
    >
      <View style={{  alignItems: 'center', marginTop:350}}>
      <Pressable 
          style={textStyles.button1}
          // We're going to want this to navigate us to change the 'next question' value
          onPress={() => props.navigation.navigate('ResultsBreakdown')}> 
          <Text style={textStyles.relationshipReport} >
            RELATIONSHIP REPORT            
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

export default ResultsScreen;
