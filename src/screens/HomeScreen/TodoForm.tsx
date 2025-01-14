/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useTodoStore } from "../../stores/todoStore";
import { useCategoryStore } from "../../stores/categoryStore";
import { useThemeStore } from "../../stores/themeStore";

const TodoForm = () => {
   const {addTodo} = useTodoStore();
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [category, setCategory] = useState('');
   const [date, setDate] = useState(new Date());
   const [showPicker, setShowPicker] = useState(false);
   const [titleError, setTitleError] = useState('');
   const [categoryError, setCategoryError] = useState('');

   const [formattedDate, setFormattedDate] = useState('');
   const [options, setOptions] = useState([{}]);
   const { categories,loadCategories} = useCategoryStore();
   const navigation = useNavigation();
   const {isDarkMode} = useThemeStore();
   const darkModeBackground = require('../../assets/images/background3.jpg'); 
   const lightModeBackground = require('../../assets/images/background3.jpeg');

   useEffect(() => {
      const fetchCategories = async () => {
         await loadCategories();
      };
      fetchCategories();
   }, []);
    useEffect(() => {
      if (categories.length > 0) {
         const categoryOptions = categories.map(category => ({
            key: category.id.toString(),
            value: category.name,
         }));
         setOptions(categoryOptions);
      }
   }, [categories]);
  
   const handleConfirm = (selectedDate: Date) => {
      setShowPicker(false);
      setDate(selectedDate);
      setFormattedDate(selectedDate.toLocaleString());
   };
   const handleSave = () => {
    if (!title.trim() || !category.trim()) {
        setTitleError('Title is required');
        setCategoryError('Category is required');
        return;
      }
    const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        category,
        date: date,
    };
    addTodo(newTodo);
    setTitle('');
    setDescription('');
    setCategory('');
    setDate(new Date());
    setFormattedDate('');
    setTitleError('');
    setCategoryError('');
    navigation.navigate('HomeScreen' as never);

 };

  const navigateToTodoForm = () => {
    navigation.navigate('HomeScreen' as never);
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
                  <TouchableOpacity style ={styles.back} onPress={navigateToTodoForm}>
                     <ArrowLeft size={20} color="#9e0e4a" />
                     <Text style={{color:'#9e0e4a',fontSize:15 ,paddingLeft:3 ,fontWeight:'500'}}>Back to home</Text>
                   </TouchableOpacity>
                     <Text style={styles.header}>Start your Journey</Text>
                     <Text style={styles.secondHeader}>with a new task !</Text>
                     <Image
                        style={styles.icon}
                        source={require('../../assets/images/todoform.png')}
                        resizeMode="contain"
                     />
                     <View style={styles.form}>
                        <Text style={[styles.nameLabel , isDarkMode && { color: '#fff' }]}>Task title</Text>
                        <TextInput
                           style={styles.input}
                           value={title}
                           onChangeText={setTitle}
                           placeholder="Add task title ..."
                        />
                        {titleError && <Text style={styles.errorText}>{titleError}</Text>}
                        <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task date</Text>
                        <Pressable onPress={() => setShowPicker(true)}>
                           <TextInput
                              style={styles.input}
                              placeholder="Select task date ..."
                              value={formattedDate}
                              editable={false}
                           />
                        </Pressable>
                        <DatePicker
                           modal
                           open={showPicker}
                           date={date}
                           onConfirm={handleConfirm}
                           onCancel={() => setShowPicker(false)}
                        />
                        <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task category</Text>
                        <Dropdown
                           style={styles.input}
                           data={options}
                           maxHeight={150}
                           placeholder="Select category ..."
                           placeholderStyle={styles.placeholderStyle}
                           value={category}
                           labelField="value"
                           valueField="value"
                           searchPlaceholder="Search..."
                           onChange={item => {
                              setCategory(item.value);
                           }}
                        />
                        {categoryError && <Text style={styles.errorText}>{categoryError}</Text>}
                        <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task description</Text>
                        <TextInput
                           style={styles.textinput}
                           placeholder="Add task description ..."
                           multiline
                           numberOfLines={5}
                           value={description}
                           onChangeText={setDescription}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                           <Text style={styles.buttonText}>Add Task</Text>
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
   keyboardAvoidingView: {
      flex: 1,
   },
   scrollView: {
     marginBottom:10,
     
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
      width: '100%',
      height: 200,
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

export default TodoForm;
