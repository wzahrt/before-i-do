import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import { RootStackParamList } from "../App";
import ResultsScreen from "../screens/ResultsScreen";
import ConsultationScreen from "../screens/ConsultationScreen";
import AssessmentScreen from "../screens/AssessmentScreen";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const HomeStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Assessment" component={AssessmentScreen} />
         <Stack.Screen name="Results" component={ResultsScreen} />
         <Stack.Screen name="Consultation" component={ConsultationScreen} />
      </Stack.Navigator>
    )
}

export default HomeStack; 