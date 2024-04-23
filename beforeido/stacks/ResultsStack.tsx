import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ResultsScreen from "../screens/ResultsScreen";
import { RootStackParamList } from "../App";
import ResultsBreakdownScreen from "../screens/ResultsBreakdownScreen";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const ResultsStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Results" component={ResultsScreen} />
         <Stack.Screen name="ResultsBreakdown" component={ResultsBreakdownScreen} />
      </Stack.Navigator>
    )
}

export default ResultsStack; 