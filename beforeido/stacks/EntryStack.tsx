import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AboutScreen from "../screens/AboutScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

export type RootStackParamList = {
    About: undefined;
    Login: undefined; 
    Signup: undefined; 
  };

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const EntryStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown:false
        }}>
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator> 
    )
}

export default EntryStack; 