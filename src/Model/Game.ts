import State from "./State"
import Guess from "./Guess"

export default class Game {
    constructor(
        public readonly day: number,
        public readonly guesses: Guess[] = [],
        public state: State = State.playing,
        public showLetters: boolean = false,
    ) {
    }

    public static empty(day: number): Game {
        return new Game(day)
    }
}