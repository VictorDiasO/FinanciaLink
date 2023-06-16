import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from './theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories } from './screens/Categories';
import { Home } from './screens/Home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />

      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name='Categories' component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
