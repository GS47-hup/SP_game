
export enum ItemCategory {
    FOOD = 'Food',
    DRINK = 'Drink',
    NATURE = 'Nature',
}

export interface VocabularyItem {
    id: string; // e.g., 'apple', 'tree' (used as matchId)
    word: string;
    category: ItemCategory;
    imageUrl: string;
}

export interface GameCard {
    uniqueId: string; // e.g., 'apple-img-instance1', 'apple-word-instance2'
    matchId: string; // 'apple'
    type: 'image' | 'word';
    content: string; // URL for image, word string for word
    item: VocabularyItem; // The original vocabulary item
}

export type GameState = 'menu' | 'playing' | 'finished';
    