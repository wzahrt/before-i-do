import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ResultsScreen from "../screens/ResultsScreen";
import { RootStackParamList } from "../App";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const ResultsStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    )
}

export default ResultsStack; 