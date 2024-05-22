import Guess from "../Model/Guess";
export default class Row {
    private readonly guess;
    constructor(guess: Guess);
    toString(): string;
}
