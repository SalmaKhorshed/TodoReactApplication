import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs'; // Import the BottomTabs navigator

function App() {
  return (
    <NavigationContainer>
      <BottomTabs /> 
    </NavigationContainer>
  );
}
export default App;