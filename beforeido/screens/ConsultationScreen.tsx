import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App

type ConsultationScreenProps = NativeStackScreenProps<RootStackParamList, "Consultation">;

const ConsultationScreen: React.FC<ConsultationScreenProps> = (props) => {
  return (
    <ImageBackground
      source={require('../assets/images/consultation2.png')}
      style={styles.backgroundImage}
    >

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Consultation Screen</Text>
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

export default ConsultationScreen;
