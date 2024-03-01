import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import { RootStackParamList } from "../App";

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const HomeStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    )
}

export default HomeStack; 