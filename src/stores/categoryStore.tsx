import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface Category {
    id: string;
    name: string;
    imagePath?:string;
}
type CategoryStore = {
    categories: Category[];
  addCategory: (category: Category) => void;
   updateCategory: (id: string, updatedCategory: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
    loadCategories: () => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
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
      deleteCategory: (id) => {
        const updatedCategories = get().categories.filter((category) => category.id !== id);
        set({ categories: updatedCategories });
        AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
      },
      loadCategories: async () => {
        const savedCategories = await AsyncStorage.getItem('categories');
        if (savedCategories) {
          set({ categories: JSON.parse(savedCategories) });
        }
      },
  }));





