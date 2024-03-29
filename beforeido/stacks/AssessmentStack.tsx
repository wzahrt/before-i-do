import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AssessmentScreen from "../screens/AssessmentScreen";
import { RootStackParamList } from "../App";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const AssessmentStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Assessment" component={AssessmentScreen} />
      </Stack.Navigator>
    )
}

export default AssessmentStack; 