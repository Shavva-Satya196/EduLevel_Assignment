import React from 'react';

interface NavigationControlsProps {
  currentIndex: number;
  totalCards: number;
  onPrev: () => void;
  onNext: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ currentIndex, totalCards, onPrev, onNext }) => {
  return (
    <div className="nav-controls">
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
      >
        Prev
      </button>
      <span>
        Card {currentIndex + 1} of {totalCards}
      </span>
      <button
        onClick={onNext}
        disabled={currentIndex === totalCards - 1}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationControls;