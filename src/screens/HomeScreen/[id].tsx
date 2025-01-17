/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { RouteProp, useNavigation, useRoute, useTheme, } from "@react-navigation/native";
import { ArrowLeft, Edit, Trash } from "lucide-react-native";
import { Alert, Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Todo, useTodoStore  } from "../../stores/todoStore";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../../App";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import { useCategoryStore } from "../../stores/categoryStore";
import { useThemeStore } from "../../stores/themeStore";


const TodoDetails = () => {
    type TodoDetailsRouteProp = RouteProp<RootStackParamList, 'TodoDetails'>;
    const route = useRoute<TodoDetailsRouteProp>();
    const { id } = route.params;
    const navigation = useNavigation();
    const [todo, setTodo] = useState<Todo | null>(null);
    const { todos, loadTodos,deleteTodo, updateTodo } = useTodoStore();
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [options, setOptions] = useState<{ key: string; value: string }[]>([]);
    const {isDarkMode} = useThemeStore();
    const [titleError, setTitleError] = useState('');
   const [categoryError, setCategoryError] = useState('');
    const {theme} = useTheme();
    const darkModeBackground = require('../../assets/images/formBackground(1).jpg'); 
    const lightModeBackground = require('../../assets/images/formBackground.jpg');
 
    const { categories,loadCategories} = useCategoryStore();
    
    const navigateTo = () => {
        navigation.navigate('HomeScreen' as never);
      };
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
          label: category.name,
        }));
        setOptions(categoryOptions);
      }
    }, [categories]);
    

      useEffect(() => {
         loadTodos();
       }, []);

       useEffect(() => {
        const foundTodo = todos.find((todo) => todo.id === id);
        setTodo(foundTodo as Todo);
        setCategory(foundTodo?.category as string);
        setTitle(foundTodo?.title as string);
        setDescription(foundTodo?.description as string);
        const parsedDate = new Date(foundTodo?.date || new Date());
        setDate(parsedDate);
        setFormattedDate(parsedDate.toLocaleString() as string);
      }, [id]);

      const handleConfirm = (selectedDate: Date) => {
        setShowPicker(false);
        setDate(selectedDate);
        setFormattedDate(selectedDate.toLocaleString());
     };

     
      const handleDelete = () => {
        Alert.alert('Are you sure you want to delete this task?', '', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => DeleteTask(id),
            style: 'destructive',
          },
        ]);
       
      };
      const DeleteTask = (id:string) => {
        deleteTodo(id);
        navigation.navigate('HomeScreen' as never);
      };
      const handleCancel = () => {
        if (todo) {
          setTitle(todo.title);
          setDescription(todo.description);
          setCategory(todo.category);
          const parsedDate = new Date(todo?.date || new Date());
          setDate(parsedDate);
          setFormattedDate(parsedDate.toLocaleString() as string);
        }
        setIsEditMode(false);
      };
      const handleSave = () => {
        if (!title.trim() || !category.trim()) {
          setTitleError('Title is required');
          setCategoryError('Category is required');
          return;
        }
        const updatedTodo = {
            id,
            title,
            description,
            category,
            date,
        };
        updateTodo(updatedTodo.id, { title, description, category, date });
        setTodo(updatedTodo);
        setIsEditMode(false);
        setTitleError('');
        setCategoryError('');
        Alert.alert('Task updated successfully');
      };


   return (
    <ImageBackground
    blurRadius={2}
       style={styles.container}
       source={isDarkMode ? darkModeBackground : lightModeBackground}
       resizeMode="cover"
    >
    <View style={styles.view}>
         <TouchableOpacity style ={styles.back} onPress={navigateTo}>
                     <ArrowLeft size={20} color="#9e0e4a" />
                     <Text style={{color:'#9e0e4a',fontSize:15 ,paddingLeft:3 ,fontWeight:'500'}}>Back to home</Text>
        </TouchableOpacity>
        <Image
         style={styles.backgroundImage}
         source={require('../../assets/images/background2.jpg')}
         resizeMode="cover"
      />
      <Text style={[styles.nameHeader]}>Task details</Text>
      <View style={styles.content}>
        {isEditMode ? (
         <>
                <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task Title</Text>
                <TextInput
                           style={styles.input}
                           value={title}
                           onChangeText={setTitle}
                           placeholder="Add task title ..."
                />
                {titleError && <Text style={styles.errorText}>{titleError}</Text>}
                <Text style={[styles.nameLabel,isDarkMode && {color:"#fff"}]}>Task Due date</Text>
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
                <Text style={[styles.nameLabel,isDarkMode && {color:"#fff"}]}>Task Category</Text>
                <Dropdown
                               style={styles.input}
                               data={options}
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
                  {categoryError && <Text style={styles.errorText}>{categoryError}</Text>}
                <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task Description</Text>
                <TextInput
                           style={styles.textinput}
                           placeholder="Add task description ..."
                           multiline
                           numberOfLines={5}
                           value={description}
                           onChangeText={setDescription}
                        />
            <View style={styles.btns}>
            <TouchableOpacity style={styles.delete} onPress={handleCancel}  >
                 <Text style={styles.deleteText}>Cancel </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.edit} onPress={handleSave} >
                <Text style={styles.deleteText}>Save </Text>
            </TouchableOpacity>


        </View>
         </>
        ) : (
            <>
                <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task Title</Text>
                <Text style={[styles.name, isDarkMode && {color:'#d15a8c'}]}>{todo?.title}</Text>
                <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task Due date</Text>
                <Text style={[styles.name,isDarkMode && {color:'#d15a8c'}]}>{formattedDate}</Text>
                <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task Category</Text>
                <Text style={[styles.name,isDarkMode && {color:'#d15a8c'}]}>{todo?.category}</Text>
                <Text style={[styles.nameLabel,isDarkMode && { color: '#fff' }]}>Task Description</Text>
                <Text style={[styles.name,isDarkMode && {color:'#d15a8c'}]}>{todo?.description}</Text>
                <View style={styles.btns}>
        
                <TouchableOpacity style={styles.delete} onPress={handleDelete} >
                                    <Trash size={20} color="white" />
                                    <Text style={styles.deleteText}>Delete task </Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.edit} onPress={()=>setIsEditMode(true)} >
                                    <Edit size={20} color="white" />
                                    <Text style={styles.deleteText}>Edit task </Text>
            </TouchableOpacity>
        
        
                </View>
            </>
        )}
    

      </View>
    </View>
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
    input: {
        borderWidth: 1.2,
        borderRadius: 16,
        padding: 10,
        marginBottom: 10,
        borderColor: '#d15a8c',
        backgroundColor: '#f7f5f6',
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
    placeholderStyle:{
        color: '#666',
        fontSize: 14,
    
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
    backgroundImage: {
        marginTop:30,
        marginLeft: 20, 
        justifyContent: 'center',
        width: screenWidth * 0.9,
        height: screenWidth * 0.4,
        borderRadius: 30,
     },
    content:{
        flexDirection:'column',
        justifyContent:'flex-start',
        margin:20,
        
    },
    nameLabel: {
        margin: 7,
        marginLeft: 6,
        color: '#9e0e4a',
        fontSize: 25,
        fontWeight: '500',
     },
     name:{
        margin: 7,
        marginLeft: 8,
        fontSize:16,
     },
    back:{
     flexDirection: 'row',
       alignItems: 'center',
       marginTop: 20,
       marginLeft: 10,
    },
    nameHeader:{
        position: 'absolute',
        top:128,
        left: 120,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
     },
    view: {
       marginBottom:10,
    },
});
export default TodoDetails;
