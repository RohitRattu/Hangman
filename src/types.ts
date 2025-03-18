//Defines structure of the game state
export type GameState = {
    word: string;
    guessedLetters: string[];
    attemptsLeft: number;
    status: 'playing' | 'won' | 'lost';
};
