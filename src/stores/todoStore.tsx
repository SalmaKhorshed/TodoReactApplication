import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
}
type TodoStore = {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    loadTodos: () => void;
};
export const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    addTodo: (todo) => {
      const updatedTodos = [...get().todos, todo];
      set({ todos: updatedTodos });
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    updateTodo: (id, updatedTodo) => {
      const updatedTodos = get().todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      set({ todos: updatedTodos });
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    deleteTodo: (id) => {
      const updatedTodos = get().todos.filter((todo) => todo.id !== id);
      set({ todos: updatedTodos });
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    loadTodos: async () => {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        set({ todos: JSON.parse(savedTodos) });
      }
    },
  }));


