import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './src/navigation/BottomTabs';
import TodoForm from './src/screens/HomeScreen/TodoForm';
import TodoDetails from './src/screens/HomeScreen/[id]';


export type RootStackParamList = {
  HomeScreen: undefined;
  CategoryScreen: undefined;
  TodoForm: undefined;
  TodoDetails: { id: string };
  CategoryForm: undefined;
  CategoryFlow: undefined;
};
const Stack = createStackNavigator<RootStackParamList>(); 
function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen" >
      <Stack.Screen name="HomeScreen" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="TodoForm" component={TodoForm} options={{ headerShown: false}} />
      <Stack.Screen name="TodoDetails" component={TodoDetails} options={{ headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
export default App;
