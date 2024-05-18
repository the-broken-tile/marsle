import MatchModel from "../Service/Matcher/Match";
export default class Match {
    private readonly match;
    constructor(match: MatchModel);
    toString(): string;
    private text;
    private renderCost;
    private getClassName;
    private renderVP;
}
