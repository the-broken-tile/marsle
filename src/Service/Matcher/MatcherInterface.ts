import Card from "../../Model/Card"
import Match from "../../Model/Match"

export default interface MatcherInterface {
    match(card: Card, target: Card): Match
}