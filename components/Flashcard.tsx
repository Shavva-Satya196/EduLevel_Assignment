import React, { useState, useEffect } from 'react';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  // Reset answer visibility when card changes
  useEffect(() => {
    setIsAnswerVisible(false);
  }, [card]);

  return (
    <div className="flashcard-container">
      <p className="flashcard-difficulty">Difficulty: {card.difficulty}</p>
      <div className="flashcard-question">
        <p><b>Question: {card.question}</b></p>
      </div>
      <hr style={{ margin: '15px 0' }} />
      <div>
        {isAnswerVisible ? (
          <>
            <b>Answer:</b>
            <p>{card.answer}</p>
            <button onClick={() => setIsAnswerVisible(false)} style={{marginTop: '10px'}}>Hide Answer</button>
          </>
        ) : (
          <button onClick={() => setIsAnswerVisible(true)}>Show Answer</button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;