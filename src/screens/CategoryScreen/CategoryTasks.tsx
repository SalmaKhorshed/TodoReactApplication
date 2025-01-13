/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { ArrowLeft } from "lucide-react-native";
import { Card, Chip } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTodoStore } from "../../stores/todoStore";
import { StackNavigationProp } from "@react-navigation/stack";



const CategoryTasks = () => {
    type TodoDetailsRouteProp = RouteProp<RootStackParamList, 'CategoryScreen'>;
    type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
    const route = useRoute<TodoDetailsRouteProp>();
    const { id  } = route.params;
    const { todos, loadTodos } = useTodoStore();
    const navigation = useNavigation();
    const detailsNavigation = useNavigation<HomeScreenNavigationProp>();
    const [filteredTodos, setFilteredTodos] = useState(todos);

    const navigateToCategory = () => {
        navigation.navigate('CategoryScreen' as never);
      };

      useEffect(() => {
        loadTodos();
      }, []);
      
      useEffect(() => {
        const filtered = todos.filter(todo => todo.category === id);
        setFilteredTodos(filtered);
      }, [todos]);
    
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.keyboardAvoidingView}
     >
          <View style={styles.view}>
          <TouchableOpacity style ={styles.back} onPress={navigateToCategory}>
                     <ArrowLeft size={20} color="#9e0e4a" />
                     <Text style={{color:'#9e0e4a',fontSize:15 ,paddingLeft:3 ,fontWeight:'500'}}>Back to categories</Text>
         </TouchableOpacity>
            <Text style={styles.header}>Tasks for</Text>
            <Text style={styles.secondHeader}>{id }</Text>
          </View>
          <View style={styles.taskContainer}>
            {filteredTodos.length > 0 ? (
                <FlatList
                data={filteredTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Pressable onPress={() => detailsNavigation.navigate('TodoDetails', { id: item.id })}>
                   <Card style={styles.card}>
                         <Card.Content style={styles.cardContent}>
                         <Text style={styles.taskTitle}> {item.title}</Text>
                         <View style={styles.chipView}>
                           <Chip style={styles.chip}>{item.category}</Chip>
                         </View>
                         </Card.Content>
                   </Card>
                   </Pressable>
                )}
                />

            ) : (
            <View style={styles.noDataContainer}>
                <Image
                  style={styles.noData}
                  source={require('../../assets/images/nodata.jpg')}
                  resizeMode="contain"
               />
               <Text style={styles.noTasks}>No tasks found</Text>

            </View>
            )}
         </View>
          </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
       flex: 1,
       backgroundColor:'#fff',
    },
    back:{
        flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginLeft: 10,
         
       },
    view: {
        alignItems: 'flex-start',
        marginBottom:10,
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
        marginLeft:5,
       
  
     },
     taskTitle:{
        fontSize: 21,
        fontWeight: 'semibold',
        color: '#333',
     },
     header: {
        marginTop: 20,
        marginLeft: 20,
        color: '#9e0e4a',
        fontSize: 30,
        fontWeight: 'bold',
     },
     card:{
        margin: 15,
        borderColor: '#f542ce',
        borderWidth: 1,
        backgroundColor: '#fff',
     },
     taskContainer:{
        width: '97%',
     },
     noData:{
        marginLeft: 40,
        width:320,
        height: 250,
        opacity: 0.5,
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
     secondHeader: {
        marginTop: 7,
        marginLeft: 22,
        color: '#9e0e4a',
        fontSize: 30,
        fontWeight: 'bold',
     },
  
});

export default CategoryTasks;
