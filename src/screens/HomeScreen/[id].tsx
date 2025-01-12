/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { RouteProp, useNavigation, useRoute, } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo, useTodoStore } from "../../stores/todoStore";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../../App";


const TodoDetails = () => {
    type TodoDetailsRouteProp = RouteProp<RootStackParamList, 'TodoDetails'>;
    const route = useRoute<TodoDetailsRouteProp>();
    const { id } = route.params;
    const navigation = useNavigation();
    const [todo, setTodo] = useState<Todo | null>(null);
    const { todos, loadTodos } = useTodoStore();
    const navigateToTodoForm = () => {
        navigation.navigate('HomeScreen' as never);
      };

      useEffect(() => {
         loadTodos();
       }, []);

       useEffect(() => {
        const foundTodo = todos.find((todo) => todo.id === id);
        setTodo(foundTodo as Todo);
      }, [id]);


   return (
    <ImageBackground
    blurRadius={2}
       style={styles.container}
       source={require('../../assets/images/formBackground.jpg')}
       resizeMode="cover"
    >
    <View style={styles.view}>
         <TouchableOpacity style ={styles.back} onPress={navigateToTodoForm}>
                     <ArrowLeft size={20} color="#9e0e4a" />
                     <Text style={{color:'#9e0e4a',fontSize:15 ,paddingLeft:3 ,fontWeight:'500'}}>Back to home</Text>
        </TouchableOpacity>
        <View style={styles.content}>
        <Text style={styles.title}>{todo?.title}</Text>
        </View>
    </View>
    </ImageBackground>
   );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
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
});
export default TodoDetails;
