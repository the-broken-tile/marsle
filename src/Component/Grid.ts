import MatchType from "../Model/MatchType"

import Guess from "../Model/Guess"
import Row from "./Row"

const MATCHES_ORDER: MatchType[] = [
    MatchType.name,
    MatchType.cost,
    MatchType.expansion,
    MatchType.type,
    MatchType.tags,
    MatchType.vp,
]

export default class Grid {
    private guesses: Guess[] = []

    constructor(
        private readonly columns: number,
        private readonly element: HTMLDivElement,
    ) {
        this.element.innerHTML = this.toString()
    }

    public toString(): string {
        return `
            <div
                class="grid"
                style="grid-template-columns: repeat(${this.columns}, 1fr); 
                    grid-template-rows: repeat(${this.guesses.length + 1}, 1fr);"
            >
                ${this.printHeader()}
                ${this.printGuesses()}
            </div>
        `
    }

    private printHeader(): string {
        return MATCHES_ORDER
            .map((match: MatchType): string => `<div class="header">${match}</div>`)
            .join("")
    }

    private printGuesses(): string {
        return this.guesses.map((guess: Guess): string => {
            return `${new Row(guess)}`
        }).join("")
    }

    public addGuess(guess: Guess): void {
        this.guesses.push(guess)
        this.element.innerHTML = this.toString()
    }
}