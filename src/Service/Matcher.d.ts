import MatcherInterface from "./Matcher/MatcherInterface";
import Card from "../Model/Card";
import Match from "../Model/Match";
export default class Matcher {
    private readonly matchers;
    constructor(matchers: MatcherInterface[]);
    match(card: Card, target: Card): Match[];
    private fullMatch;
}
