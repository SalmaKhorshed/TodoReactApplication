import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/Home';
import Category from '../screens/CategoryScreen/Category';
import Profile from '../screens/ProfileScreen/Profile';
import Settings from '../screens/SettingsScreen/Settings';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { House, Shapes, CircleUserRound, SettingsIcon } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={styles.view}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTab]}>
              <House size={20} color={focused ? '#c3034c' : '#fff'} />
              <Text style={[styles.tabText, focused && styles.activeText]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={styles.view}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTab]}>
              <Shapes size={20} color={focused ? '#c3034c' : '#fff'} />
              <Text style={[styles.tabText, focused && styles.activeText]}>Category</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={styles.view}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTab]}>
              <CircleUserRound size={20} color={focused ? '#c3034c' : '#fff'} />
              <Text style={[styles.tabText, focused && styles.activeText]}>Profile</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarButton: (props) => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View style={styles.view}>{props.children}</View>
            </TouchableWithoutFeedback>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.activeTab]}>
              <SettingsIcon size={20} color={focused ? '#c3034c' : '#fff'} />
              <Text style={[styles.tabText, focused && styles.activeText]}>Settings</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  view:{
    marginLeft: 30,
},
  tabBar: {
    position: 'absolute',
    bottom: 15,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: '#c3034c',
    borderRadius: 25,
    height: 90,
    elevation: 3,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    top: 30,
  },
  activeTab: {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
  },
  tabText: {
    color: '#fff',
    paddingTop: 3,
  },
  activeText: {
    color: '#c3034c',
  },
});

export default BottomTabs;
