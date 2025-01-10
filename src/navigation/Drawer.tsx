
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from '../screens/SettingsScreen/Settings'
const Drawer = createDrawerNavigator();
const SettingsDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="SettingsScreen" component={Settings} />
      </Drawer.Navigator>
    );
  };
export default SettingsDrawer;