import MatcherInterface from "./MatcherInterface"

import Card from "../../Model/Card"
import Match from "../../Model/Match"
import MatchType from "../../Model/MatchType"
import MatchValue from "../../Model/MatchValue"

export default class CostMatcher implements MatcherInterface {
    match(card: Card, target: Card): Match {
        if (card.cost === target.cost) {
            return new Match(MatchType.cost, MatchValue.full)
        }

        if (card.cost < target.cost) {
            return new Match(MatchType.cost, MatchValue.lower)
        }

        return new Match(MatchType.cost, MatchValue.higher)
    }

}
