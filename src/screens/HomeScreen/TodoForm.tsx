/* eslint-disable react/react-in-jsx-scope */
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useTodoStore } from "../../stores/todoStore";

const TodoForm = () => {
    const {addTodo} = useTodoStore();
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [category, setCategory] = useState('');
   const [date, setDate] = useState(new Date());
   const [showPicker, setShowPicker] = useState(false);
   const [formattedDate, setFormattedDate] = useState('');
   const navigation = useNavigation();
   const handleConfirm = (selectedDate: Date) => {
      setShowPicker(false);
      setDate(selectedDate);
      setFormattedDate(selectedDate.toLocaleString());
   };
   const handleSave = () => {
    if (!title.trim() || !category.trim()) {
        Alert.alert('Validation Error', 'Title and Category are required.');
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
    navigation.navigate('HomeScreen' as never);

 };
   const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const navigateToTodoForm = () => {
    navigation.navigate('HomeScreen' as never);
  };

   return (
      <ImageBackground
         blurRadius={1}
         style={styles.container}
         source={require('../../assets/images/background3.jpeg')}
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
                        <Text style={styles.nameLabel}>Task title</Text>
                        <TextInput
                           style={styles.input}
                           value={title}
                           onChangeText={setTitle}
                           placeholder="Add task title ..."
                        />
                        <Text style={styles.nameLabel}>Task date</Text>
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
                        <Text style={styles.nameLabel}>Task category</Text>
                        <Dropdown
                               style={styles.input}
                               data={data}
                              
                               maxHeight={150}
                               placeholder="Select category ..."
                               placeholderStyle={styles.placeholderStyle}
                               value={category}
                               labelField="label"
                                valueField="value"
                                searchPlaceholder="Search..."
                               onChange={item => {
                                   setCategory(item.value);

                               }}
                               
                               />
                        <Text style={styles.nameLabel}>Task description</Text>
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
