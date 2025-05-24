
import React from 'react';
import { GameCard } from '../types';
import { QuestionMarkCircleIcon, CheckCircleIcon } from './icons';

interface CardProps {
  card: GameCard;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isDisabled: boolean; // To prevent clicking during processing or if already matched/flipped
}

const Card: React.FC<CardProps> = ({ card, isFlipped, isMatched, onClick, isDisabled }) => {
  const baseStyle = "w-32 h-40 md:w-36 md:h-48 rounded-lg shadow-lg flex items-center justify-center p-2 transition-all duration-300 ease-in-out transform";
  const clickableStyle = isDisabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-105";
  
  let content: React.ReactNode;
  let cardStyle = "";

  if (isFlipped || isMatched) {
    if (card.type === 'image') {
      content = <img src={card.content} alt={card.item.word} className="max-w-full max-h-full object-contain rounded-md" />;
      cardStyle = `bg-sky-200 ${baseStyle}`;
    } else {
      content = <p className="text-xl md:text-2xl font-bold text-center text-slate-700">{card.content}</p>;
      cardStyle = `bg-lime-200 ${baseStyle}`;
    }
    if (isMatched) {
      cardStyle += " border-4 border-green-500 opacity-80";
      content = (
        <div className="relative w-full h-full flex items-center justify-center">
          {content}
          <div className="absolute top-1 right-1">
            <CheckCircleIcon className="w-6 h-6 text-green-600 bg-white rounded-full" />
          </div>
        </div>
      );
    }
  } else {
    content = <QuestionMarkCircleIcon className="w-16 h-16 text-white opacity-80" />;
    cardStyle = `bg-purple-500 ${baseStyle} ${clickableStyle}`;
  }

  return (
    <div
      className={`${cardStyle} ${!isFlipped && !isMatched ? clickableStyle : ''}`}
      onClick={!isDisabled && !isMatched ? onClick : undefined}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={isDisabled || isMatched ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled && !isMatched) {
          onClick();
        }
      }}
    >
      {content}
    </div>
  );
};

export default Card;
    