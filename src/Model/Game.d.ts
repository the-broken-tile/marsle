import State from "./State";
import Guess from "./Guess";
export default class Game {
    readonly day: number;
    readonly guesses: Guess[];
    state: State;
    showLetters: boolean;
    constructor(day: number, guesses?: Guess[], state?: State, showLetters?: boolean);
    static empty(day: number): Game;
}
