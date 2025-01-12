/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { RouteProp, useNavigation, useRoute, } from "@react-navigation/native";
import { ArrowLeft, Delete, Edit, Trash } from "lucide-react-native";
import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Todo, useTodoStore } from "../../stores/todoStore";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../../App";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";


const TodoDetails = () => {
    type TodoDetailsRouteProp = RouteProp<RootStackParamList, 'TodoDetails'>;
    const route = useRoute<TodoDetailsRouteProp>();
    const { id } = route.params;
    const navigation = useNavigation();
    const [todo, setTodo] = useState<Todo | null>(null);
    const { todos, loadTodos,deleteTodo } = useTodoStore();
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    
    const navigateTo = () => {
        navigation.navigate('HomeScreen' as never);
      };

      useEffect(() => {
         loadTodos();
       }, []);

       useEffect(() => {
        const foundTodo = todos.find((todo) => todo.id === id);
        setTodo(foundTodo as Todo);
      }, [id]);

      const data = [
        { label: 'Item 1', value: 'category1' },
        { label: 'Item 2', value: 'category2' },
        { label: 'Item 3', value: 'category3' },
        { label: 'Item 4', value: 'category4' },
        { label: 'Item 5', value: 'category5' },
        { label: 'Item 6', value: 'category6' },
        { label: 'Item 7', value: 'category7' },
        { label: 'Item 8', value: 'category8' },
      ];
      const handleDelete = () => {
        deleteTodo(id);
        navigation.navigate('HomeScreen' as never);
      };


   return (
    <ImageBackground
    blurRadius={2}
       style={styles.container}
       source={require('../../assets/images/formBackground.jpg')}
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
      <Text style={styles.nameHeader}>Task details</Text>
      <View style={styles.content}>
        {isEditMode ? (
         <>
                <Text style={styles.nameLabel}>Task Title</Text>
                <TextInput
                           style={styles.input}
                           value={todo?.title}
                           placeholder="Add task title ..."
                />
                <Text style={styles.nameLabel}>Task Due date</Text>
                <Pressable onPress={() => setShowPicker(true)}>
                           <TextInput
                              style={styles.input}
                              placeholder="Select task date ..."
                              value={todo?.date.toLocaleString()}
                              editable={false}
                           />
                        </Pressable>
                        <DatePicker
                           modal
                           open={showPicker}
                           date={ new Date()}
                           
                           onCancel={() => setShowPicker(false)}
                        />
                <Text style={styles.nameLabel}>Task Category</Text>
                <Dropdown
                               style={styles.input}
                               data={data}
                              
                               maxHeight={150}
                               placeholder="Select category ..."
                               placeholderStyle={styles.placeholderStyle}
                               value={todo?.category}
                               labelField="label"
                                valueField="value"
                                searchPlaceholder="Search..."
                                onChange={(item) => {
                                    
                                }}
                               
                               />
                <Text style={styles.nameLabel}>Task Description</Text>
                <TextInput
                           style={styles.textinput}
                           placeholder="Add task description ..."
                           multiline
                           numberOfLines={5}
                           value={todo?.description}
                           
                        />
            <View style={styles.btns}>
        
        <TouchableOpacity style={styles.delete} >
                           
                            <Text style={styles.deleteText}>Cancel </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.edit} onPress={()=>setIsEditMode(true)} >
                            
                            <Text style={styles.deleteText}>Save </Text>
    </TouchableOpacity>


        </View>
         </>
        ) : (
            <>
                <Text style={styles.nameLabel}>Task Title</Text>
                <Text style={styles.name}>{todo?.title}</Text>
                <Text style={styles.nameLabel}>Task Due date</Text>
                <Text style={styles.name}>{todo?.date.toLocaleString()}</Text>
                <Text style={styles.nameLabel}>Task Category</Text>
                <Text style={styles.name}>{todo?.category}</Text>
                <Text style={styles.nameLabel}>Task Description</Text>
                <Text style={styles.name}>{todo?.description}</Text>
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
