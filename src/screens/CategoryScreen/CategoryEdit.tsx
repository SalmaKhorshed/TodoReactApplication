/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Category, useCategoryStore } from "../../stores/categoryStore";
import { RootStackParamList } from "../../../App";
import { useThemeStore } from "../../stores/themeStore";

const CategoryEdit = () => {
   const { categories, loadCategories,updateCategory} = useCategoryStore();
   const [name, setName] = useState('');
   type TodoDetailsRouteProp = RouteProp<RootStackParamList, 'CategoryScreen'>;
   const [category, setCategory] = useState<Category | null>(null);
   const route = useRoute<TodoDetailsRouteProp>();
   const { id  } = route.params;
   const navigation = useNavigation();
   const [titleError, setTitleError] = useState('');
   const {isDarkMode} = useThemeStore();
   const darkModeBackground = require('../../assets/images/background3.jpg'); 
   const lightModeBackground = require('../../assets/images/background3.jpeg');
   

   useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
   const foundCategory = categories.find((category) => category.id === id);
   setCategory(foundCategory as Category);
   setName( foundCategory?.name as string);
 }, [id]);
   
   const handleSave = () => {
    if (!name.trim()) {
        setTitleError('Category name is required');
        return;
      }
      const updatedCategory = {
        id,
        name,
    };
    updateCategory(category as Category, updatedCategory);
    setCategory(updatedCategory);
    setName('');
    setTitleError('');
    navigation.navigate('CategoryScreen' as never);
 };

 const handleCancel = () => {
    if (category) {
      setName(category.name);
    }
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
                     <Text style={styles.header}>Edit category</Text>
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
                        {titleError && <Text style={styles.errorText}>{titleError}</Text>}
                         <View style={styles.btns}>
                            <TouchableOpacity style={styles.delete} onPress={handleCancel}  >
                                <Text style={styles.deleteText}>Cancel </Text>
                            </TouchableOpacity>

                                <TouchableOpacity style={styles.edit} onPress={handleSave} >
                                    <Text style={styles.deleteText}>Save </Text>
                                </TouchableOpacity>
                        </View>
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
   errorText: {
      color: 'red',
      marginLeft: 1,
    
   },
   back:{
    flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginLeft: 10,
     
   },
   btns:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop: 20,
},
deleteText:{
    color:'white',
    paddingLeft: 5,
},
edit:{
    height: 50,
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
    height: 50,
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

export default CategoryEdit;
