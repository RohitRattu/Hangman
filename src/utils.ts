//Fetch random word from API
export const getRandomWord = async (): Promise<string> => {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const [word] = await response.json();
    return word.toUpperCase();

};

//Check game condition
export const isGameWon = (word: string, guessedLetters: string[]): boolean => {
    return word.split('').every(letter => guessedLetters.includes(letter));
};


export const isGameLost = (attempsLeft: number): boolean => {
    return attempsLeft <= 0;
};
