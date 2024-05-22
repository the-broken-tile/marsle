import Guess from "../Model/Guess";
export default class Grid {
    private readonly columns;
    private readonly element;
    private guesses;
    constructor(columns: number, element: HTMLDivElement);
    toString(): string;
    private printHeader;
    private printGuesses;
    addGuess(guess: Guess): void;
}
