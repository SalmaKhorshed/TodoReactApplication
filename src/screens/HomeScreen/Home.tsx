/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { PlusIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View,TextInput, TouchableOpacity, FlatList } from "react-native";
import { useTodoStore } from "../../stores/todoStore";
import { Card, Chip } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";



const HomeScreen = () => {
   const navigation = useNavigation();
   const { todos, loadTodos } = useTodoStore();

   useEffect(() => {
      loadTodos();
    }, []);

   const navigateToTodoForm = () => {
     navigation.navigate('TodoForm' as never);
   };
   return (
      <View style={styles.view}>
      <Image
         style={styles.backgroundImage}
         source={require('../../assets/images/background2.jpg')}
         resizeMode="cover"
      />
         <Text style={styles.header}>Hello,</Text>
         <Image
                  style={styles.avatar}
                  source={require('../../assets/images/avatar.jpg')}
                  resizeMode="contain"
               />
      <Text style={styles.nameHeader}>Salma Ahmed</Text>
      <View style={styles.content}>
         <Text style={styles.contentHeader}>Looking for a specific task ? </Text>
         <View style={styles.search}>
            <TextInput
            style={styles.input}
            placeholder="search ..."

         />
         </View>
         <View style={styles.addTask}>
            <Text style={styles.taskHeader}>Add a new task  </Text>
            <TouchableOpacity style={styles.button} onPress={navigateToTodoForm}>
               <PlusIcon size={25} color="#fff" />
            </TouchableOpacity>
         </View>
         <View style={styles.container}>
            {todos.length > 0 ? (
                <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                   <Card style={styles.card}>
                         <Card.Content style={styles.cardContent}>
                         <Text style={styles.taskTitle}> {item.title}</Text>
                         <View style={styles.chipView}>
                           <Chip style={styles.chip}>{item.category}</Chip>
                         </View>
                        
                         </Card.Content>
                   </Card>
                   
                )}
                />

            ): (
            <View style={styles.noDataContainer}>
                <Image
                  style={styles.noData}
                  source={require('../../assets/images/nodata.jpg')}
                  resizeMode="contain"
               />
               <Text style={styles.noTasks}>No tasks yet</Text>

            </View>
            )}
           
         </View>
         


      </View>
   </View>
   );
};

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
   view: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
   },
   backgroundImage: {
      width: screenWidth,
      height: screenWidth * 0.4,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
   },
   header:{
      position: 'absolute',
      top:40,
      left: 30,
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
   },
   cardContent:{
      flexDirection: 'column',
      padding: 10,
      

   },
   chipView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   chip:{
      marginTop:10,
      borderWidth:2,

   },
   taskTitle:{
      fontSize: 21,
      fontWeight: 'semibold',
      color: '#333',
   },
   taskCategory:{
      paddingTop:10,
      fontSize: 16,
      fontWeight: 'semibold',
      color: '#333',
   },
   label:{
      padding: 3,
      paddingLeft: 10,
      fontSize: 16,
      fontWeight: '400',
      color: '#333',
   },
   card:{
      margin: 15,
    
      backgroundColor: '#95f0eb',
   },
   noDataContainer: {
      marginTop: 30,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

   noTasks:{
      marginLeft:40,
      fontSize: 19,
      fontWeight: '400',
      color: '#000',
   },
   contentHeader:{
      marginTop: 10,
      padding: 17,
      paddingBottom: 8,
      fontSize: 19,
      fontWeight: '500',
      color: '#000',
   },
   taskHeader:{
      marginTop: 2,
      padding: 17,
      paddingBottom: 8,
      fontSize: 19,
      fontWeight: '500',
      color: '#000',
   },
   nameHeader:{
      position: 'absolute',
      top:88,
      left: 30,
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
   },
   addTask:{
      flexDirection: 'row',
   },
   noData:{
      marginLeft: 40,
      width:320,
      height: 250,
      opacity: 0.5,
   },
   container:{
      width: '97%',
   },
   search:{
      width: '97%',
   },
   button: {
      width: 40,
      height: 40,
      marginTop: 12,
      borderRadius: 30,
      backgroundColor: '#6200ee',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
   },
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1.2,
      borderRadius: 14,
      padding: 10,
      borderColor:'#ab0f6d',
      backgroundColor: '#f7f5f6',
    },
   avatar: {
      position: 'absolute',
      top:40,
      left: 290,
      height: 75,
      width: 75,
      borderRadius: 16,
      borderColor: '#fff',
   },
   content:{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',

   },

});
export default HomeScreen;
