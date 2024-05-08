import React from 'react';
import {Dimensions, Text, Button, View, StyleSheet, ImageBackground, Pressable } from '../node_modules/react-native';
import { NativeStackScreenProps } from '../node_modules/@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import your RootStackParamList
import { textStyles } from '../TextStyles';

type AboutScreenProps = NativeStackScreenProps<RootStackParamList, "About">;
const AboutScreen: React.FC<AboutScreenProps> = (props) => {

  const { height, width } = Dimensions.get('window');

  return (
    <ImageBackground
      source={require('../assets/images/about-turkish.png')}
      style={styles.backgroundImage}
    >
      <Pressable onPress={() => props.navigation.push('About2')}>
        <View style={{position: 'absolute', justifyContent: "space-between"}}>
            <Text style={{fontSize: 15, marginTop: height*0.45, marginLeft: width*.8,position: 'absolute', color: '#ffffe4', textAlign: 'right'}}>
            Devam et
            </Text>
          </View>
      </Pressable>
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

export default AboutScreen;
