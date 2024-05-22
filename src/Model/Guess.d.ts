import Card from "./Card";
import Match from "./Match";
export default class Guess {
    readonly card: Card;
    readonly matches: Match[];
    constructor(card: Card, matches: Match[]);
}
