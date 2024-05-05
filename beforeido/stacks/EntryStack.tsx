import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AboutScreen from "../screens/AboutScreen";
import About2Screen from "../screens/About2Screen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { RootStackParamList } from "../App";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const EntryStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}>
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="About2" component={About2Screen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator> 
    )
}

export default EntryStack; 