import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './src/navigation/BottomTabs';
import TodoForm from './src/screens/HomeScreen/TodoForm';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="TodoForm" component={TodoForm} options={{ headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
export default App;
