/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen/Home';


import Category from '../screens/CategoryScreen/Category';
import Profile from '../screens/ProfileScreen/Profile';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { House , Shapes,CircleUserRound,SettingsIcon} from 'lucide-react-native';
import Settings from '../screens/SettingsScreen/Settings';

const Tab = createBottomTabNavigator();


const BottomTabs = () => {
   return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
         <Tab.Screen name="Home" component={HomeScreen}  options={{
           tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={styles.view}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
            tabBarIcon: () => (
              <View style={styles.tabBarView}>
               <House size={20} color="#fff" />
                <Text style={styles.tabText}>Home</Text>
              </View>
            ),
         }}/>
         <Tab.Screen name="Category" component={Category} options={{
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                  <View style={styles.view} >{props.children}</View>
                </TouchableWithoutFeedback>
              ),
            tabBarIcon: () => (
              <View style={styles.tabBarView}>
               <Shapes size={20} color="#fff" />
                <Text style={styles.tabText}>Category</Text>
              </View>
            ),
         }} />
         <Tab.Screen name="Profile" component={Profile} options={{
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                  <View style={styles.view}>{props.children}</View>
                </TouchableWithoutFeedback>
              ),
            tabBarIcon: () => (
              <View style={styles.tabBarView}>
               <CircleUserRound size={20} color="#fff" />
                <Text style={styles.tabText}>Profile</Text>
              </View>
            ),
         }} />
         <Tab.Screen name="Settings" component={Settings} options={{
            tabBarButton: (props) => (
                <TouchableWithoutFeedback onPress={props.onPress}>
                  <View style={styles.view}>{props.children}</View>
                </TouchableWithoutFeedback>
              ),
            tabBarIcon: () => (
              <View style={styles.tabBarView}>
               <SettingsIcon size={20} color="#fff" />
                <Text style={styles.tabText}>Settings</Text>
              </View>
            ),
         }} />
      </Tab.Navigator>
   );
};




const styles = StyleSheet.create({
    tabBar : {
        position: 'absolute',
          bottom: 15,
          marginLeft: 25,
          marginRight: 25,
          backgroundColor: '#c3034c',
          borderRadius: 25,
          height: 90,
          elevation: 3,
    },
    view:{
        marginLeft: 30,
    },
    tabBarView : {
        alignItems: 'center',
        justifyContent: 'center',
        top: 30 ,
        width: 200,
    },
    tabText : {
        color:  '#fff',
        paddingTop: 3,
    },

});

export default BottomTabs;
