import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 20;
const GAME_SPEED = 150;

const SnakeGame = ({ isExpanded = false }) => {
  const [cellSize, setCellSize] = useState(15);
  const [snake, setSnake] = useState([{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const boardRef = useRef(null);

  // Responsive Cell Size
  useEffect(() => {
    const calculateSize = () => {
      if (!isExpanded) {
        setCellSize(15);
        return;
      }
      
      // Calculate max available width (screen width - padding)
      // On desktop, limit to 600px (30px * 20). On mobile, fit screen.
      // Padding safety: 48px (p-6) * 2 sides approx 
      const maxGameWidth = Math.min(window.innerWidth - 80, 600);
      const calculated = Math.floor(maxGameWidth / GRID_SIZE);
      
      // Clamp between 10px and 30px
      setCellSize(Math.max(10, Math.min(30, calculated)));
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, [isExpanded]);

  // Generate random food position
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPlaying, gameOver]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = { ...prevSnake[0] };

        switch (direction) {
          case 'UP': newHead.y -= 1; break;
          case 'DOWN': newHead.y += 1; break;
          case 'LEFT': newHead.x -= 1; break;
          case 'RIGHT': newHead.x += 1; break;
          default: break;
        }

        // Check Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
          // Grow snake (don't pop tail)
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, isPlaying, gameOver, generateFood]);

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }]);
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setFood(generateFood());
    setIsPlaying(true);
    // Focus board to capture keys instantly if needed, though window listener handles it
  };

  return (
    <div className="flex flex-col items-center p-4 bg-dark-500/50 border border-primary-500/30 rounded w-fit mx-auto mt-2 mb-2">
      <div className="flex justify-between w-full mb-2 text-primary-300 font-mono text-sm">
        <span>SCORE: {score}</span>
        <span>{gameOver ? 'GAME OVER' : (isPlaying ? 'PLAYING' : 'READY')}</span>
      </div>

      <div 
        ref={boardRef}
        className="relative bg-dark-900 border border-primary-500/50"
        style={{
          width: GRID_SIZE * cellSize,
          height: GRID_SIZE * cellSize
        }}
      >
        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-sm"
          style={{
            left: food.x * cellSize,
            top: food.y * cellSize,
            width: cellSize - 2,
            height: cellSize - 2,
          }}
        />

        {/* Snake */}
        {snake.map((segment, i) => (
          <div
            key={`${segment.x}-${segment.y}-${i}`}
            className={`absolute ${i === 0 ? 'bg-primary-400' : 'bg-primary-600'} rounded-sm`}
            style={{
              left: segment.x * cellSize,
              top: segment.y * cellSize,
              width: cellSize - 2,
              height: cellSize - 2,
            }}
          />
        ))}

        {/* Overlay for Start/Game Over */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-2 backdrop-blur-sm z-10">
            <p className="text-primary-300 font-bold mb-2">
              {gameOver ? 'GAME OVER' : 'SNAKE GAME'}
            </p>
            <button
              onClick={resetGame}
              className="px-3 py-1 bg-primary-500 text-dark-900 font-bold rounded hover:bg-primary-400 transition-colors text-xs"
            >
              {gameOver ? 'TRY AGAIN' : 'START GAME'}
            </button>
            <p className="text-xs text-primary-300/60 mt-2 hidden md:block">Use Arrow Keys</p>
            <p className="text-xs text-primary-300/60 mt-2 md:hidden">Tap buttons below</p>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 mt-4 md:hidden">
        <div />
        <button 
          className="w-12 h-12 bg-dark-200 border border-primary-500/50 rounded flex items-center justify-center active:bg-primary-500/20"
          onClick={(e) => { e.preventDefault(); if (direction !== 'DOWN') setDirection('UP'); }}
        >
          ⬆️
        </button>
        <div />
        <button 
          className="w-12 h-12 bg-dark-200 border border-primary-500/50 rounded flex items-center justify-center active:bg-primary-500/20"
          onClick={(e) => { e.preventDefault(); if (direction !== 'RIGHT') setDirection('LEFT'); }}
        >
          ⬅️
        </button>
        <button 
          className="w-12 h-12 bg-dark-200 border border-primary-500/50 rounded flex items-center justify-center active:bg-primary-500/20"
          onClick={(e) => { e.preventDefault(); if (direction !== 'UP') setDirection('DOWN'); }}
        >
          ⬇️
        </button>
        <button 
          className="w-12 h-12 bg-dark-200 border border-primary-500/50 rounded flex items-center justify-center active:bg-primary-500/20"
          onClick={(e) => { e.preventDefault(); if (direction !== 'LEFT') setDirection('RIGHT'); }}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;
