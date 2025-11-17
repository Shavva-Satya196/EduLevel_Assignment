
import { GoogleGenAI, Type } from '@google/genai';
import type { Flashcard } from '../types';

const flashcardSchema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: 'The question for the flashcard. Should be concise and clear.'
    },
    answer: {
      type: Type.STRING,
      description: 'The detailed and accurate answer to the flashcard question.'
    },
    difficulty: {
      type: Type.STRING,
      description: 'The difficulty level of the question. Must be one of: easy, medium, hard.'
    },
  },
  required: ['question', 'answer', 'difficulty'],
};

const flashcardsArraySchema = {
  type: Type.ARRAY,
  items: flashcardSchema,
};

export const generateFlashcards = async (topic: string): Promise<Flashcard[]> => {
  if (!topic || topic.trim() === '') {
    throw new Error('Topic cannot be empty.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert educator. Your task is to generate a set of exactly 15 flashcards about the topic: "${topic}".
    The flashcards must cover a range of complexities suitable for learning.
    You must provide exactly 15 flashcards in total.
    The distribution of difficulty must be precise:
    - 5 flashcards with "easy" difficulty.
    - 5 flashcards with "medium" difficulty.
    - 5 flashcards with "hard" difficulty.
    
    Each flashcard must be a JSON object with three properties: "question", "answer", and "difficulty".
    Return the output as a single JSON array of these 15 flashcard objects, adhering to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: flashcardsArraySchema,
      },
    });

    const text = response.text.trim();
    const flashcards: Flashcard[] = JSON.parse(text);

    if (!Array.isArray(flashcards) || flashcards.length !== 15) {
      throw new Error('AI returned an invalid number of flashcards. Please try again.');
    }
    
    // Additional validation just in case
    for (const card of flashcards) {
        if (!card.question || !card.answer || !card.difficulty) {
            throw new Error('AI returned a malformed flashcard. Please try again.');
        }
    }

    return flashcards;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error('Failed to generate flashcards. The AI may be experiencing issues. Please try again later.');
  }
};
