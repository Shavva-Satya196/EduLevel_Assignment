
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Flashcard {
  question: string;
  answer: string;
  difficulty: Difficulty;
}
