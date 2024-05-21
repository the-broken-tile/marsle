import Card from "./Card"
import Match from "./Match"

export default class Guess {
    constructor(public readonly card: Card, public readonly matches: Match[]) {
    }
}