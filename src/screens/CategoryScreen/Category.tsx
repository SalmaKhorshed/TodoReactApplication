/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { StackNavigationProp } from "@react-navigation/stack";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";


const CategoryScreen = () => {
   type CategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategoryScreen'>;
   const navigation = useNavigation<CategoryScreenNavigationProp>();
   const [searchQuery, setSearchQuery] = useState("");
   const navigateToCategoryForm = () => {
      navigation.navigate('CategoryForm' as never);
    };
   return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={styles.keyboardAvoidingView}
   >
        <ScrollView contentContainerStyle={styles.scrollView}>
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
         </View>
         </ScrollView>
      </KeyboardAvoidingView>
     
   );
};

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
   keyboardAvoidingView: {
      flex: 1,
      backgroundColor:'#fff',
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
