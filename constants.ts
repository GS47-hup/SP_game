
import { VocabularyItem, ItemCategory } from './types';

export const GAME_TITLE = "Nature & Nosh Adventure";
export const ITEMS_PER_ROUND = 6; // Number of unique items, so 12 cards

export const VOCABULARY: VocabularyItem[] = [
    // Food
    { id: 'apple', word: 'Apple', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/apple_food/200/200' },
    { id: 'banana', word: 'Banana', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/banana_fruit/200/200' },
    { id: 'bread', word: 'Bread', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/bread_loaf/200/200' },
    { id: 'cake', word: 'Cake', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/cake_slice/200/200' },
    { id: 'candy', word: 'Candy', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/candy_sweet/200/200' },
    { id: 'chicken', word: 'Chicken', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/chicken_drumstick/200/200' },
    { id: 'fish', word: 'Fish', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/fish_blue/200/200' },
    { id: 'icecream', word: 'Ice Cream', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/icecream_cone/200/200' },
    { id: 'orange', word: 'Orange', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/orange_fruit/200/200' },
    { id: 'rice', word: 'Rice', category: ItemCategory.FOOD, imageUrl: 'https://picsum.photos/seed/rice_bowl/200/200' },
    
    // Drinks
    { id: 'juice', word: 'Juice', category: ItemCategory.DRINK, imageUrl: 'https://picsum.photos/seed/juice_box/200/200' },
    { id: 'milk', word: 'Milk', category: ItemCategory.DRINK, imageUrl: 'https://picsum.photos/seed/milk_carton/200/200' },
    { id: 'water', word: 'Water', category: ItemCategory.DRINK, imageUrl: 'https://picsum.photos/seed/water_glass/200/200' },

    // Nature
    { id: 'flower', word: 'Flower', category: ItemCategory.NATURE, imageUrl: 'https://picsum.photos/seed/flower_red/200/200' },
    { id: 'grass', word: 'Grass', category: ItemCategory.NATURE, imageUrl: 'https://picsum.photos/seed/grass_field/200/200' },
    { id: 'lake', word: 'Lake', category: ItemCategory.NATURE, imageUrl: 'https://picsum.photos/seed/lake_mountain/200/200' },
    { id: 'river', word: 'River', category: ItemCategory.NATURE, imageUrl: 'https://picsum.photos/seed/river_stream/200/200' },
    { id: 'tree', word: 'Tree', category: ItemCategory.NATURE, imageUrl: 'https://picsum.photos/seed/tree_green/200/200' },
];

// Helper function to shuffle an array (Fisher-Yates)
export function shuffleArray<T,>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
    