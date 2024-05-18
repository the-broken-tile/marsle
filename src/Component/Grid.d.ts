import Match from "../Service/Matcher/Match";
export default class Grid {
    private readonly columns;
    private readonly element;
    private matches;
    constructor(columns: number, element: HTMLDivElement);
    toString(): string;
    private printHeader;
    private printMatches;
    addRow(matches: Match[]): void;
}
