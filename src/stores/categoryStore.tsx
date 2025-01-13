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
   updateCategory: (id: string, updatedCategory: Partial<Category>) => void;
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
      updateCategory: (id, updatedCategory) => {
        const updatedCategories = get().categories.map((category) =>
          category.id === id ? { ...category, ...updatedCategory } : category
        );
        set({ categories: updatedCategories });
        AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
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





