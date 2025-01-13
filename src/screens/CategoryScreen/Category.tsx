/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { StackNavigationProp } from "@react-navigation/stack";
import { Edit, PlusIcon, Trash } from "lucide-react-native";
import { useEffect, useState } from "react";
import {  FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { Category, useCategoryStore } from "../../stores/categoryStore";
import { Card } from "react-native-paper";


const CategoryScreen = () => {
   type CategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategoryScreen'>;
   const navigation = useNavigation<CategoryScreenNavigationProp>();
   const [searchQuery, setSearchQuery] = useState("");
   const { categories, loadCategories,deleteCategory } = useCategoryStore();
   const [filteredCategories, setFilteredCategories] = useState(categories);
   useEffect(() => {
      loadCategories();
    }, []);

    useEffect(() => {
      if (searchQuery.trim() === '') {
         setFilteredCategories(categories);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        setFilteredCategories(categories.filter(category => 
          category.name.toLowerCase().includes(lowercasedQuery)
        ));
      }
    }, [categories, searchQuery]);

    const handleDelete = (category: Category) => {
      deleteCategory(category);
    };
    const handleEdit = (id:string) => {
      navigation.navigate('CategoryEdit' as never, { id } );
    };



   const navigateToCategoryForm = () => {
      navigation.navigate('CategoryForm' as never);
    };
   return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={styles.keyboardAvoidingView}
   >
        <View style={styles.view}>
        <Text style={styles.header}>Task Categories</Text>
        <Text style={styles.secondHeader}>Where goals begin !</Text>
        <View style={styles.search}>
            <TextInput
            style={styles.input}
            placeholder="search for category ..."
            value={searchQuery}
            onChangeText={setSearchQuery}
         />
         </View>
         <View style={styles.addCategory}>
            <Text style={styles.categoryHeader}>Add a new Category  </Text>
            <TouchableOpacity style={styles.button} onPress={navigateToCategoryForm}>
               <PlusIcon size={25} color="#fff" />
            </TouchableOpacity>
         </View>
         <View style={styles.taskContainer}>
            {filteredCategories.length > 0 ? (
                <FlatList
                data={filteredCategories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} 
                renderItem={({ item }) => (
                  <Pressable onPress={() => navigation.navigate('CategoryTasks' as never, { id: item.name })}>
                   <Card style={styles.card}>
                         <Card.Content style={styles.cardContent}>
                         <Image
                           style={styles.backgroundImage}
                           source={require('../../assets/images/images(1).jpeg')}
                           resizeMode="cover"
                        />
                         <Text style={styles.taskTitle}> {item.name}</Text>
                         <View style={styles.btns}>
        
                           <TouchableOpacity style={styles.delete} onPress={()=>handleDelete(item)}  >
                           <Trash size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.edit} onPress={()=>handleEdit(item.id)} >
                           <Edit size={20} color="white" />
                                                
                        </TouchableOpacity>


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
               <Text style={styles.noTasks}>No Categories found</Text>

            </View>
            )}
         </View>
         </View>
      </KeyboardAvoidingView>
     
   );
};
const styles = StyleSheet.create({
   keyboardAvoidingView: {
      flex: 1,
      backgroundColor:'#fff',
   },
   backgroundImage:{
     width: 150,
     height:100,
     borderRadius: 20,
     marginBottom:10,

   },
   btns:{
      flexDirection:'row',
      justifyContent:'center',
      marginLeft:20,
      
  },
  edit:{
   padding:10,
   marginTop: 18,
   marginRight: 20,
   borderRadius: 10,
   backgroundColor: 'green',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection:'row',
   elevation: 5,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.3,
   shadowRadius: 4,
},
   delete: {
     
      padding:10,
      marginTop: 18,
      marginRight: 20,
      borderRadius: 10,
      backgroundColor: 'darkred',
      justifyContent: 'center',
      flexDirection:'row',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
   },
   deleteText:{
      color:'white',
      paddingLeft: 5,
  },
   taskContainer:{
      marginTop:10,
      paddingBottom:20,
      width: '97%',
   },
   cardContent:{
      flexDirection: 'column',
      padding: 10,
   },
   noTasks:{
      marginLeft:40,
      fontSize: 19,
      fontWeight: '400',
      color: '#000',
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
    taskTitle:{
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
   },

   card:{
      margin: 10,
      
      backgroundColor: '#fff',
   },
   search:{
      marginTop:20,
      width: '97%',
   },
   addCategory:{
      flexDirection: 'row',
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
    categoryHeader:{
      marginTop: 2,
      padding: 17,
      paddingBottom: 8,
      fontSize: 19,
      fontWeight: '500',
      color: '#000',
   },

   scrollView: {
      marginBottom:10,
       flexGrow: 1,
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
    view: {
      alignItems: 'flex-start',
      marginBottom:10,
   },
   header: {
      marginTop: 20,
      marginLeft: 20,
      color: '#9e0e4a',
      fontSize: 30,
      fontWeight: 'bold',
   },
   secondHeader: {
      marginTop: 7,
      marginLeft: 22,
      color: '#9e0e4a',
      fontSize: 30,
      fontWeight: 'bold',
   },

});
export default CategoryScreen;
