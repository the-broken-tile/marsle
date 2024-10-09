import MatcherInterface from "./MatcherInterface"

import Card from "../../Model/Card"
import Match from "../../Model/Match"
import MatchType from "../../Model/MatchType"
import MatchValue from "../../Model/MatchValue"

export default class NameMatcher implements MatcherInterface {
    public match(card: Card, target: Card): Match {
        return new Match(
            MatchType.name,
            card.name === target.name ? MatchValue.full : MatchValue.no,
        )
    }
}
