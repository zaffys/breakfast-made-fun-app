import { IndexedEntity } from "./core-utils";
import type { Recipe, Category } from "@shared/types";
const RECIPES_SEED_DATA: Recipe[] = [
  {
    id: 'classic-pancakes',
    title: 'Classic Fluffy Pancakes',
    description: 'A timeless recipe for perfectly light and fluffy pancakes.',
    category: 'Pancakes',
    prepTime: 10,
    cookTime: 15,
    servings: '4',
    ingredients: [
      { amount: '1 1/2 cups', item: 'all-purpose flour' },
      { amount: '3 1/2 tsp', item: 'baking powder' },
      { amount: '1 tsp', item: 'salt' },
      { amount: '1 tbsp', item: 'white sugar' },
      { amount: '1 1/4 cups', item: 'milk' },
      { amount: '1', item: 'egg' },
      { amount: '3 tbsp', item: 'butter, melted' },
    ],
    instructions: [
      'In a large bowl, sift together the flour, baking powder, salt and sugar.',
      'Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.',
      'Heat a lightly oiled griddle or frying pan over medium high heat.',
      'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.',
      'Brown on both sides and serve hot.',
    ],
    illustration: '/src/assets/illustrations/pancakes.svg',
  },
  {
    id: 'scrambled-eggs',
    title: 'Creamy Scrambled Eggs',
    description: 'Perfectly creamy and soft scrambled eggs, a breakfast staple.',
    category: 'Eggs',
    prepTime: 5,
    cookTime: 5,
    servings: '2',
    ingredients: [
      { amount: '4', item: 'large eggs' },
      { amount: '1/4 cup', item: 'milk' },
      { amount: '2 tbsp', item: 'butter' },
      { amount: 'to taste', item: 'salt and pepper' },
    ],
    instructions: [
      'Whisk eggs, milk, salt, and pepper in a medium bowl.',
      'Melt butter in a nonstick skillet over medium heat.',
      'Pour in egg mixture. Cook, stirring occasionally, until eggs are just set.',
      'Remove from heat and serve immediately.',
    ],
    illustration: '/src/assets/illustrations/eggs.svg',
  },
  {
    id: 'avocado-toast',
    title: 'Simple Avocado Toast',
    description: 'A quick, healthy, and delicious breakfast to start your day right.',
    category: 'Healthy',
    prepTime: 5,
    cookTime: 5,
    servings: '1',
    ingredients: [
      { amount: '1 slice', item: 'of whole-wheat bread, toasted' },
      { amount: '1/2', item: 'ripe avocado' },
      { amount: 'to taste', item: 'salt and pepper' },
      { amount: 'pinch', item: 'of red pepper flakes (optional)' },
    ],
    instructions: [
      'Toast the slice of bread to your liking.',
      'In a small bowl, mash the avocado with a fork.',
      'Spread the mashed avocado evenly on the toast.',
      'Season with salt, pepper, and red pepper flakes if desired.',
    ],
    illustration: '/src/assets/illustrations/healthy.svg',
  },
  {
    id: 'berry-smoothie',
    title: 'Mixed Berry Smoothie',
    description: 'A refreshing and antioxidant-rich smoothie to energize your morning.',
    category: 'Smoothies',
    prepTime: 5,
    cookTime: 0,
    servings: '2',
    ingredients: [
      { amount: '1 cup', item: 'mixed frozen berries (strawberries, blueberries, raspberries)' },
      { amount: '1/2', item: 'banana' },
      { amount: '1 cup', item: 'Greek yogurt or milk of choice' },
      { amount: '1 tbsp', item: 'honey or maple syrup (optional)' },
    ],
    instructions: [
      'Combine all ingredients in a blender.',
      'Blend until smooth and creamy.',
      'Pour into glasses and serve immediately.',
    ],
    illustration: '/src/assets/illustrations/smoothies.svg',
  },
];
const CATEGORIES_SEED_DATA: Category[] = [
  { id: 'pancakes', name: 'Pancakes', illustration: '/src/assets/illustrations/pancakes.svg' },
  { id: 'eggs', name: 'Eggs', illustration: '/src/assets/illustrations/eggs.svg' },
  { id: 'healthy', name: 'Healthy', illustration: '/src/assets/illustrations/healthy.svg' },
  { id: 'smoothies', name: 'Smoothies', illustration: '/src/assets/illustrations/smoothies.svg' },
];
export class RecipeEntity extends IndexedEntity<Recipe> {
  static readonly entityName = "recipe";
  static readonly indexName = "recipes";
  static readonly initialState: Recipe = { 
    id: "", 
    title: "", 
    description: "", 
    category: "", 
    prepTime: 0, 
    cookTime: 0, 
    servings: "", 
    ingredients: [], 
    instructions: [], 
    illustration: "" 
  };
  static seedData = RECIPES_SEED_DATA;
}
export class CategoryEntity extends IndexedEntity<Category> {
  static readonly entityName = "category";
  static readonly indexName = "categories";
  static readonly initialState: Category = { id: "", name: "", illustration: "" };
  static seedData = CATEGORIES_SEED_DATA;
}