import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
    Profile: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const ProfileStack = () => {
   
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
         <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    )
}

export default ProfileStack; 