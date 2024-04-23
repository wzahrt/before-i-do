import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import { RootStackParamList } from "../App";
import ResultsScreen from "../screens/ResultsScreen";
import ConsultationScreen from "../screens/ConsultationScreen";
import AssessmentScreen from "../screens/AssessmentScreen";
import Questionnaire1Screen from "../screens/Questionnaire1Screen";
import ResultsBreakdownScreen from "../screens/ResultsBreakdownScreen";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const HomeStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="HomePage" component={HomeScreen} />
         <Stack.Screen name="Assessment" component={AssessmentScreen} />
         <Stack.Screen name="Results" component={ResultsScreen} />
         <Stack.Screen name="Consultation" component={ConsultationScreen} />
         <Stack.Screen name='Questionnaire1' component={Questionnaire1Screen} />
         <Stack.Screen name='ResultsBreakdown' component={ResultsBreakdownScreen} />
      </Stack.Navigator>
    )
}

export default HomeStack; 