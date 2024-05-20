import MatchModel from "../Service/Matcher/Match";
export default class Match {
    private readonly match;
    constructor(match: MatchModel);
    toString(): string;
    private innerHtml;
    private renderVP;
}
