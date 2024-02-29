import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ConsultationScreen from "../screens/ConsultationScreen";

export type RootStackParamList = {
    Consultation: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const ConsultationStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Consultation" component={ConsultationScreen} />
      </Stack.Navigator>
    )
}

export default ConsultationStack; 