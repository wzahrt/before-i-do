import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Import RootStackParamList from App

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Results Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => props.navigation.push('Home')}
      />
    </View>
  );
};

export default ResultsScreen;
