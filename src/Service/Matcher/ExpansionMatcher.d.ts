import MatcherInterface from "./MatcherInterface";
import Card from "../../Model/Card";
import Match from "../../Model/Match";
export default class ExpansionMatcher implements MatcherInterface {
    match(card: Card, target: Card): Match;
}
