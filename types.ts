import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { ActionIcon } from './components/icons/ActionIcon';
import { AdventureIcon } from './components/icons/AdventureIcon';
import { PuzzleIcon } from './components/icons/PuzzleIcon';
import { SportsIcon } from './components/icons/SportsIcon';
import { RacingIcon } from './components/icons/RacingIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { StrategyIcon } from './components/icons/StrategyIcon';
import { ClassicIcon } from './components/icons/ClassicIcon';
import { CodeIcon } from './components/icons/CodeIcon';


export enum Category {
  Action = 'Action',
  Adventure = 'Adventure',
  Puzzle = 'Puzzle',
  Sports = 'Sports',
  Racing = 'Racing',
  Girls = 'Girls',
  Strategy = 'Strategy',
  Classic = 'Classic',
  OpenSource = 'OpenSource'
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
  [Category.OpenSource]: { en: 'Open Source', ar: 'مفتوحة المصدر' }
};

export const CATEGORY_DETAILS: Record<Category, { en: string; ar: string; slug: string; icon: React.FC<{className?: string}> }> = {
  [Category.Action]: { en: 'Action', ar: 'أكشن', slug: 'action-games', icon: ActionIcon },
  [Category.Adventure]: { en: 'Adventure', ar: 'مغامرات', slug: 'adventure-games', icon: AdventureIcon },
  [Category.Puzzle]: { en: 'Puzzle', ar: 'ذكاء', slug: 'puzzle-games', icon: PuzzleIcon },
  [Category.Sports]: { en: 'Sports', ar: 'رياضة', slug: 'sports-games', icon: SportsIcon },
  [Category.Racing]: { en: 'Racing', ar: 'سيارات', slug: 'car-games', icon: RacingIcon },
  [Category.Girls]: { en: 'Girls', ar: 'بنات', slug: 'girls-games', icon: SparklesIcon },
  [Category.Strategy]: { en: 'Strategy', ar: 'استراتيجية', slug: 'strategy-games', icon: StrategyIcon },
  [Category.Classic]: { en: 'Classic', ar: 'كلاسيك', slug: 'classic-games', icon: ClassicIcon },
  [Category.OpenSource]: { en: 'Open Source', ar: 'مفتوحة المصدر', slug: 'open-source-games', icon: CodeIcon },
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
  rating: number;
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

export type User = SupabaseUser;
