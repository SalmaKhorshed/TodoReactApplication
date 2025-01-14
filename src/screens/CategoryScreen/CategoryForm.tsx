/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCategoryStore } from "../../stores/categoryStore";
import { useThemeStore } from "../../stores/themeStore";

const CategoryForm = () => {
   const {addCategory} = useCategoryStore();
   const [name, setName] = useState('');
   const navigation = useNavigation();
   const {isDarkMode} = useThemeStore();
   const darkModeBackground = require('../../assets/images/background3.jpg'); 
   const lightModeBackground = require('../../assets/images/background3.jpeg');
   
   const handleSave = () => {
    if (!name.trim()) {
        Alert.alert('Validation Error', 'Category name is required .');
        return;
      }
    const newCategory = {
        id: Date.now().toString(),
        name,

    };
    addCategory(newCategory);
    setName('');
    navigation.navigate('CategoryScreen' as never);
 };

  const navigateToCategory = () => {
    navigation.navigate('CategoryScreen' as never);
  };

   return (
      <ImageBackground
         blurRadius={1}
         style={styles.container}
         source={isDarkMode ? darkModeBackground : lightModeBackground}
         resizeMode="cover"
      >
         <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            style={styles.keyboardAvoidingView}
         >
           
               <ScrollView contentContainerStyle={styles.scrollView}>
                  <View style={styles.view}>
                  <TouchableOpacity style ={styles.back} onPress={navigateToCategory}>
                     <ArrowLeft size={20} color="#9e0e4a" />
                     <Text style={{color:'#9e0e4a',fontSize:15 ,paddingLeft:3 ,fontWeight:'500'}}>Back to categories</Text>
                   </TouchableOpacity>
                     <Text style={styles.header}>Create a new category</Text>
                     <Text style={styles.secondHeader}>for your todos !</Text>
                     <Image
                        style={styles.icon}
                        source={require('../../assets/images/category.png')}
                        resizeMode="contain"
                     />
                     <View style={styles.form}>
                        <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Category name </Text>
                        <TextInput
                           style={styles.input}
                           value={name}
                           onChangeText={setName}
                           placeholder="Add category name ..."
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                           <Text style={styles.buttonText}>Add Category</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </ScrollView>
         </KeyboardAvoidingView>
      </ImageBackground>
   );
};

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
   container: {
      width: screenWidth,
      height: screenHeight,
   },
   back:{
    flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginLeft: 10,
     
   },
   keyboardAvoidingView: {
      flex: 1,
   },
   scrollView: {
     marginBottom:10,
      flexGrow: 1,
   },
   view: {
      alignItems: 'flex-start',
      marginBottom:10,
   },
   header: {
      marginTop: 20,
      marginLeft: 20,
      color: '#d15a8c',
      fontSize: 30,
      fontWeight: 'bold',
   },
   secondHeader: {
      marginTop: 7,
      marginLeft: 22,
      color: '#d15a8c',
      fontSize: 30,
      fontWeight: 'bold',
   },
   icon: {
    marginTop: 25,
      width: '100%',
      height: 180,
   },
   form: {
      margin: 20,
      width: '90%',
   },
   input: {
      borderWidth: 1.2,
      borderRadius: 16,
      padding: 10,
      marginBottom: 10,
      borderColor: '#d15a8c',
      backgroundColor: '#f7f5f6',
   },
   textinput: {
      borderWidth: 1.2,
      borderRadius: 16,
      padding: 10,
      marginBottom: 10,
      borderColor: '#d15a8c',
      backgroundColor: '#f7f5f6',
      height: 100,
      textAlignVertical: 'top',
   },
   buttonText: {
      color: '#fff',
   },
   button: {
      height: 40,
      marginTop: 18,
      borderRadius: 10,
      backgroundColor: '#9e0e4a',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
   },
   nameLabel: {
      margin: 7,
      marginLeft: 0,
      color: '#9e0e4a',
      fontSize: 16,
      fontWeight: '400',
   },
   placeholderStyle:{
    color: '#666',
    fontSize: 14,

   },
});

export default CategoryForm;
