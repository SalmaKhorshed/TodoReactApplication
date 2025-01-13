/* eslint-disable no-return-assign */
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, useTodoStore } from './todoStore';


export interface Category {
    id: string;
    name: string;
    imagePath?:string;
}
type CategoryStore = {
    categories: Category[];
  addCategory: (category: Category) => void;
   updateCategory: (oldCategory:Category, updatedCategory: Partial<Category>) => void;
    deleteCategory: (category: Category) => void;
    loadCategories: () => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    todos:[],
    addCategory: (category) => {
        const updatedCategories = [...get().categories, category];
        set({ categories: updatedCategories });
        AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
      },
      updateCategory: async (oldCategory, updatedCategory) => {
        const updatedCategories = get().categories.map((category) =>
          category.id === oldCategory.id ? { ...category, ...updatedCategory } : category
        );
        set({ categories: updatedCategories });
        AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos) {
          const updatedTodos = JSON.parse(savedTodos).map((todo: { category: string; }) =>
            todo.category === oldCategory.name
  ? { ...todo, category: updatedCategory.name }
  : todo
          );
            AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
            const todoStore = useTodoStore.getState();
            todoStore.loadTodos();
        }
      },
      deleteCategory: async (categoryToDelete) => {
        const updatedCategories = get().categories.filter((category) => category.id !== categoryToDelete.id);
        set({ categories: updatedCategories });
        AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos) {
          const todosWithCategory = JSON.parse(savedTodos).filter((todo: Todo) => todo.category !== categoryToDelete.name);
          AsyncStorage.setItem('todos', JSON.stringify(todosWithCategory));
          const todoStore = useTodoStore.getState();
          todoStore.loadTodos();
        }
      },
      loadCategories: async () => {
        const savedCategories = await AsyncStorage.getItem('categories');
        if (savedCategories) {
          set({ categories: JSON.parse(savedCategories) });
        }
      },
  }));





