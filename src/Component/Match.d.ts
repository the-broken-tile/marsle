import Guess from "../Model/Guess";
import MatchModel from "../Model/Match";
export default class Match {
    private readonly guess;
    private readonly match;
    constructor(guess: Guess, match: MatchModel);
    toString(): string;
    private innerHtml;
    private renderVP;
}
