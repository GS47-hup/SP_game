
import React, { useState, useEffect, useCallback } from 'react';
import { GameCard, VocabularyItem, GameState } from './types';
import { VOCABULARY, GAME_TITLE, ITEMS_PER_ROUND, shuffleArray } from './constants';
import Card from './components/Card';
import { SparklesIcon, PlayIcon, ArrowPathIcon } from './components/icons';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentCards, setCurrentCards] = useState<GameCard[]>([]);
  const [flippedCardUniqueIds, setFlippedCardUniqueIds] = useState<string[]>([]);
  const [matchedPairMatchIds, setMatchedPairMatchIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [roundItemsCount, setRoundItemsCount] = useState(ITEMS_PER_ROUND);

  const initializeGame = useCallback(() => {
    const shuffledVocabulary = shuffleArray(VOCABULARY);
    const selectedItems = shuffledVocabulary.slice(0, roundItemsCount);

    const gameCards: GameCard[] = [];
    selectedItems.forEach((item, index) => {
      gameCards.push({
        uniqueId: `${item.id}-img-${index}`,
        matchId: item.id,
        type: 'image',
        content: item.imageUrl,
        item: item,
      });
      gameCards.push({
        uniqueId: `${item.id}-word-${index}`,
        matchId: item.id,
        type: 'word',
        content: item.word,
        item: item,
      });
    });

    setCurrentCards(shuffleArray(gameCards));
    setFlippedCardUniqueIds([]);
    setMatchedPairMatchIds([]);
    setScore(0);
    setAttempts(0);
    setIsProcessing(false);
    setGameState('playing');
  }, [roundItemsCount]);

  useEffect(() => {
    if (flippedCardUniqueIds.length === 2) {
      setIsProcessing(true);
      const [firstCardUniqueId, secondCardUniqueId] = flippedCardUniqueIds;
      const firstCard = currentCards.find(c => c.uniqueId === firstCardUniqueId);
      const secondCard = currentCards.find(c => c.uniqueId === secondCardUniqueId);

      if (firstCard && secondCard) {
        setAttempts(prev => prev + 1);
        if (firstCard.matchId === secondCard.matchId) {
          setMatchedPairMatchIds(prev => [...prev, firstCard.matchId]);
          setScore(prev => prev + 10); // Add 10 points for a match
          setFlippedCardUniqueIds([]);
          setIsProcessing(false);
        } else {
          setTimeout(() => {
            setFlippedCardUniqueIds([]);
            setIsProcessing(false);
          }, 1200); // Time to see the non-matching cards
        }
      } else {
        // Should not happen, but reset if it does
        setFlippedCardUniqueIds([]);
        setIsProcessing(false);
      }
    }
  }, [flippedCardUniqueIds, currentCards]);

  useEffect(() => {
    if (matchedPairMatchIds.length > 0 && matchedPairMatchIds.length === roundItemsCount) {
      setTimeout(() => setGameState('finished'), 500); // Short delay before showing finished screen
    }
  }, [matchedPairMatchIds, roundItemsCount]);

  const handleCardClick = (card: GameCard) => {
    if (isProcessing || flippedCardUniqueIds.includes(card.uniqueId) || matchedPairMatchIds.includes(card.matchId)) {
      return; // Card is already processing, flipped, or matched
    }

    if (flippedCardUniqueIds.length < 2) {
      setFlippedCardUniqueIds(prev => [...prev, card.uniqueId]);
    }
  };
  
  const handleStartGame = (itemsCount: number) => {
    setRoundItemsCount(itemsCount);
    // The actual game initialization will be triggered by useEffect listening to roundItemsCount, 
    // or we can call initializeGame directly. For simplicity, let's adjust initializeGame or call it.
    // initializeGame relies on roundItemsCount, so we can call it after setting state.
    // To ensure `initializeGame` uses the new `itemsCount`, we pass it directly.
    
    // Temporary workaround for state update timing
    const shuffledVocabulary = shuffleArray(VOCABULARY);
    const selectedItems = shuffledVocabulary.slice(0, itemsCount);

    const gameCards: GameCard[] = [];
    selectedItems.forEach((item, index) => {
      gameCards.push({
        uniqueId: `${item.id}-img-${index}`,
        matchId: item.id,
        type: 'image',
        content: item.imageUrl,
        item: item,
      });
      gameCards.push({
        uniqueId: `${item.id}-word-${index}`,
        matchId: item.id,
        type: 'word',
        content: item.word,
        item: item,
      });
    });

    setCurrentCards(shuffleArray(gameCards));
    setFlippedCardUniqueIds([]);
    setMatchedPairMatchIds([]);
    setScore(0);
    setAttempts(0);
    setIsProcessing(false);
    setGameState('playing');
  };


  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 via-green-200 to-blue-300 p-4 text-center">
      <SparklesIcon className="w-24 h-24 text-yellow-500 animate-bounce-slow" />
      <h1 className="text-5xl md:text-6xl font-bold text-purple-700 my-8">{GAME_TITLE}</h1>
      <p className="text-xl text-slate-600 mb-8">Match pictures to words! Choose your challenge:</p>
      <div className="space-y-4">
        <button
          onClick={() => handleStartGame(4)}
          className="flex items-center justify-center gap-2 w-64 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <PlayIcon /> Easy (4 pairs)
        </button>
        <button
          onClick={() => handleStartGame(6)}
          className="flex items-center justify-center gap-2 w-64 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <PlayIcon /> Medium (6 pairs)
        </button>
        <button
          onClick={() => handleStartGame(8)}
          className="flex items-center justify-center gap-2 w-64 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <PlayIcon /> Hard (8 pairs)
        </button>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-green-200 via-sky-200 to-indigo-200 p-4">
      <h1 className="text-4xl font-bold text-purple-600 my-6">{GAME_TITLE}</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-lg md:text-xl">
        <p className="bg-white/70 px-4 py-2 rounded-lg shadow text-slate-700">Matches: <span className="font-bold text-green-600">{matchedPairMatchIds.length} / {roundItemsCount}</span></p>
        <p className="bg-white/70 px-4 py-2 rounded-lg shadow text-slate-700">Attempts: <span className="font-bold text-blue-600">{attempts}</span></p>
        <p className="bg-white/70 px-4 py-2 rounded-lg shadow text-slate-700">Score: <span className="font-bold text-yellow-600">{score}</span></p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {currentCards.map(card => (
          <Card
            key={card.uniqueId}
            card={card}
            isFlipped={flippedCardUniqueIds.includes(card.uniqueId)}
            isMatched={matchedPairMatchIds.includes(card.matchId)}
            onClick={() => handleCardClick(card)}
            isDisabled={isProcessing || flippedCardUniqueIds.length >=2}
          />
        ))}
      </div>
      <button
        onClick={() => initializeGame()}
        className="mt-8 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105"
      >
        <ArrowPathIcon /> Restart Game
      </button>
       <button
        onClick={() => setGameState('menu')}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105"
      >
        Back to Menu
      </button>
    </div>
  );

  const renderFinished = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-4 text-center">
      <SparklesIcon className="w-32 h-32 text-yellow-400 animate-ping-slow" />
      <h1 className="text-5xl font-bold text-white my-8">Congratulations!</h1>
      <p className="text-2xl text-white mb-4">You matched all {roundItemsCount} pairs!</p>
      <p className="text-xl text-white mb-2">Your Score: <span className="font-bold">{score}</span></p>
      <p className="text-xl text-white mb-8">Attempts: <span className="font-bold">{attempts}</span></p>
      <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
        <button
          onClick={() => initializeGame()}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <ArrowPathIcon /> Play Again
        </button>
        <button
          onClick={() => setGameState('menu')}
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );

  switch (gameState) {
    case 'menu':
      return renderMenu();
    case 'playing':
      return renderGame();
    case 'finished':
      return renderFinished();
    default:
      return renderMenu();
  }
};

export default App;
    