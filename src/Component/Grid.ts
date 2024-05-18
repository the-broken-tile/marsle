import Match from "../Service/Matcher/Match"
import MatchType from "../Service/Matcher/MatchType"

import MatchView from "./Match"

const MATCHES_ORDER: MatchType[] = [
    MatchType.name,
    MatchType.cost,
    MatchType.expansion,
    MatchType.type,
    MatchType.tags,
    MatchType.vp,
]

export default class Grid {
    private matches: Match[][] = []

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
                    grid-template-rows: repeat(${this.matches.length + 1}, 1fr);"
            >
                ${this.printHeader()}
                ${this.printMatches()}
            </div>
        `
    }

    private printHeader(): string {
        return MATCHES_ORDER
            .map((match: MatchType): string => `<div class="header">${match}</div>`)
            .join("")
    }

    private printMatches(): string {
        return this.matches
            .map((matches: Match[]): string => {
                return matches.map((match: Match): string => {
                    return `${new MatchView(match)}`
                })
                .join("")
            })
            .join("")
    }

    public addRow(matches: Match[]): void {
        this.matches.push(matches)
        this.element.innerHTML = this.toString()
    }
}