import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';

import {useAuth} from '../contexts/AuthContext';

const AppNavigator = () => {
  const {user} = useAuth();
  const Stack = createNativeStackNavigator();

  const AuthNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  const ChatNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat With GPT"
        component={ChatScreen}
        options={{
          headerStyle: {backgroundColor: '#343541'},
          headerTitleStyle: {color: '#FFFFFF'},
        }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {user ? <ChatNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
