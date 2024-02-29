import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  return (
    <ImageBackground
      source={require('../assets/images/report.png')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Results Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => props.navigation.push('Home')}
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

export default ResultsScreen;
