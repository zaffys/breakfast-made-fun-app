export interface Ingredient {
  amount: string;
  item: string;
}
export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
  illustration: string;
}
export interface Category {
  id: string;
  name: string;
  illustration: string;
}
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}