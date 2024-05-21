import MatchView from "./Match"

import Guess from "../Model/Guess"
import Match from "../Model/Match"

export default class Row {
    constructor(private readonly guess: Guess) {
    }

    public toString(): string {
        return this.guess.matches.map((match: Match): string => {
            return `${new MatchView(this.guess, match)}`
        }).join("")
    }
}