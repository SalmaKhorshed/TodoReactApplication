/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


const Category = () => {
   const [searchQuery, setSearchQuery] = useState("");
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
export default Category;
