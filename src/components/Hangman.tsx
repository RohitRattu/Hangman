import React, {useState, useEffect} from "react";
import { getRandomWord, isGameWon, isGameLost } from "../utils";
import { GameState } from "../types";

const Hangman: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        word: "",
        guessedLetters: [],
        attemptsLeft: 0,
        status: "playing"
    });


useEffect(() => {
    startGame();
}, []);

const startGame = async () => {
    const word = await getRandomWord();
    setGameState({
        word,
        guessedLetters: [],
        attemptsLeft: 6,
        status: "playing"
    });
};

const handleGuess = (letter:string) => {
    if (gameState.guessedLetters.includes(letter) || 
        gameState.status === "won" || 
        gameState.status === "lost") {
        return;
    }
    const newGuessedLetters = [...gameState.guessedLetters, letter];
    const isCorrect = gameState.word.includes(letter);
    const attemptsLeft = isCorrect ? gameState.attemptsLeft : gameState.attemptsLeft - 1;
    
    const status = isGameWon(gameState.word, newGuessedLetters) ? "won" : isGameLost(attemptsLeft) ? "lost" : "playing";

    setGameState({
        ...gameState,
        guessedLetters: newGuessedLetters,
        attemptsLeft,
        status,
    });
};

    const displayWord = gameState.word.split("").map((letter) => (gameState.guessedLetters.includes(letter) ? letter: "_")).join(" ");

    return (
        <div className="hangman">
          <h1>Hangman Game</h1>
          <p className="word-display">{displayWord}</p>
          <p>Attempts Left: {gameState.attemptsLeft}</p>
          <p
            className={`status-message ${
              gameState.status === "won" ? "won" : gameState.status === "lost" ? "lost" : ""
            }`}
          >
            {gameState.status === "won"
              ? "You Won!"
              : gameState.status === "lost"
              ? `You Lost! The word was: ${gameState.word}`
              : "Playing..."}
          </p>
          <div className="letters">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={
                  gameState.guessedLetters.includes(letter) ||
                  gameState.status === "won" ||
                  gameState.status === "lost"
                }
              >
                {letter}
              </button>
            ))}
          </div>
          <button className="restart-button" onClick={startGame}>
            Restart Game
          </button>
        </div>
      );
};


export default Hangman;
