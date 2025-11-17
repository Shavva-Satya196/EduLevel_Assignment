import React, { useState, useCallback } from 'react';
import type { Flashcard as FlashcardType } from './types';
import { generateFlashcards } from './services/geminiService';
import TopicInputForm from './components/TopicInputForm';
import Flashcard from './components/Flashcard';
import NavigationControls from './components/NavigationControls';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFlashcards = useCallback(async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setFlashcards([]);
    setCurrentCardIndex(0);

    try {
      const cards = await generateFlashcards(topic);
      setFlashcards(cards);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  
  const startOver = () => {
      setFlashcards([]);
      setError(null);
      setCurrentCardIndex(0);
  }

  return (
    <>
      <header>
        <h1>AI Flashcard Generator</h1>
        <p>
          Enter any topic and get a set of 15 flashcards to supercharge your learning.
        </p>
      </header>

      <main>
        {!flashcards.length && !isLoading && !error && (
            <TopicInputForm onSubmit={handleGenerateFlashcards} isLoading={isLoading} />
        )}
        
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {flashcards.length > 0 && !isLoading && (
          <div>
            <Flashcard card={flashcards[currentCardIndex]} />
            <NavigationControls
              currentIndex={currentCardIndex}
              totalCards={flashcards.length}
              onPrev={handlePrevCard}
              onNext={handleNextCard}
            />
            <button
                onClick={startOver}
                className="start-over-button"
            >
                Generate New Topic
            </button>
          </div>
        )}
      </main>

      
    </>
  );
};

export default App;