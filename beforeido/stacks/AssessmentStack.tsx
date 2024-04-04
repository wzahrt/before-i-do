import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AssessmentScreen from "../screens/AssessmentScreen";
import { RootStackParamList } from "../App";
import Questionnaire1Screen from "../screens/Questionnaire1Screen";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const AssessmentStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Assessment" component={AssessmentScreen} />
         <Stack.Screen name="Questionnaire1" component={Questionnaire1Screen} />

      </Stack.Navigator>
    )
}

export default AssessmentStack; 