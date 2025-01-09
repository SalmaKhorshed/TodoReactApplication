import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeScreen from '../screens/HomeScreen/Home';
import Settings from '../screens/SettingsScreen/Settings'
import Category from '../screens/CategoryScreen/Category';
import Profile from '../screens/ProfileScreen/Profile';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { House , Shapes,CircleUserRound,SettingsIcon} from 'lucide-react-native';



const BottomTabs= () => {
   return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          marginLeft: 25,
          marginRight: 25,
          backgroundColor: '#c3034c',
          borderRadius: 25,
          height: 90,
          elevation: 3,
        },
      }}
    >
         <Tab.Screen name="Home" component={HomeScreen}  options={{
           tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={{marginLeft: 30}}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
            tabBarIcon: () => (
              <View style={{ alignItems: 'center', justifyContent: 'center',top: 30 , width: 200  }}>
               <House size={20} color='#fff' />
                <Text style={{ color:  '#fff',paddingTop: 3}}>Home</Text>
              </View>
            ),
         }}/>
         <Tab.Screen name="Category" component={Category} options={{
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                  <View style={{marginLeft: 30}} >{props.children}</View>
                </TouchableWithoutFeedback>
              ),
            tabBarIcon: () => (
              <View style={{ alignItems: 'center', justifyContent: 'center',top: 30 , width:200  }}>
               <Shapes size={20} color='#fff' />
                <Text style={{ color:  '#fff',paddingTop: 3}}>Category</Text>
              </View>
            ),
         }} />
         <Tab.Screen name="Profile" component={Profile} options={{
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                  <View style={{marginLeft: 30}}>{props.children}</View>
                </TouchableWithoutFeedback>
              ),
            tabBarIcon: () => (
              <View style={{ alignItems: 'center', justifyContent: 'center',top: 30 , width:200  }}>
               <CircleUserRound size={20} color='#fff' />
                <Text style={{ color:  '#fff',paddingTop: 3}}>Profile</Text>
              </View>
            ),
         }} />
         <Tab.Screen name="Settings" component={Settings} options={{
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                  <View style={{marginLeft: 30}}>{props.children}</View>
                </TouchableWithoutFeedback>
              ),
            tabBarIcon: () => (
              <View style={{ alignItems: 'center', justifyContent: 'center',top: 30 , width:200  }}>
               <SettingsIcon size={20} color='#fff' />
                <Text style={{ color:  '#fff',paddingTop: 3}}>Settings</Text>
              </View>
            ),
         }} />
      </Tab.Navigator>
   );
}
export default BottomTabs;