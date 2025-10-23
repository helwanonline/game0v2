export enum Category {
  Action = 'Action',
  Adventure = 'Adventure',
  Puzzle = 'Puzzle',
  Sports = 'Sports',
  Racing = 'Racing',
  Girls = 'Girls',
  Strategy = 'Strategy',
  Classic = 'Classic',
}

export const CATEGORY_TRANSLATIONS: Record<Category, { en: string; ar: string }> = {
  [Category.Action]: { en: 'Action', ar: 'أكشن' },
  [Category.Adventure]: { en: 'Adventure', ar: 'مغامرات' },
  [Category.Puzzle]: { en: 'Puzzle', ar: 'ذكاء' },
  [Category.Sports]: { en: 'Sports', ar: 'رياضة' },
  [Category.Racing]: { en: 'Racing', ar: 'سيارات' },
  [Category.Girls]: { en: 'Girls', ar: 'بنات' },
  [Category.Strategy]: { en: 'Strategy', ar: 'استراتيجية' },
  [Category.Classic]: { en: 'Classic', ar: 'كلاسيك' },
};

export const CATEGORY_DETAILS: Record<Category, { en: string; ar: string; slug: string }> = {
  [Category.Action]: { en: 'Action', ar: 'أكشن', slug: 'action-games' },
  [Category.Adventure]: { en: 'Adventure', ar: 'مغامرات', slug: 'adventure-games' },
  [Category.Puzzle]: { en: 'Puzzle', ar: 'ذكاء', slug: 'puzzle-games' },
  [Category.Sports]: { en: 'Sports', ar: 'رياضة', slug: 'sports-games' },
  [Category.Racing]: { en: 'Racing', ar: 'سيارات', slug: 'car-games' },
  [Category.Girls]: { en: 'Girls', ar: 'بنات', slug: 'girls-games' },
  [Category.Strategy]: { en: 'Strategy', ar: 'استراتيجية', slug: 'strategy-games' },
  [Category.Classic]: { en: 'Classic', ar: 'كلاسيك', slug: 'classic-games' },
};


export type Game = {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  category: Category;
  tags: string[];
  thumbnailUrl: string;
  playCount: number;
  gameUrl: string;
  engine: 'html5' | 'dos';
};

export type Language = 'ar' | 'en';

export type Post = {
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  content_en: string;
  content_ar: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
  tags: string[];
  readingTime: number; // in minutes
};