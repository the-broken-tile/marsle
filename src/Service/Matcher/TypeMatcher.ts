import MatcherInterface from "./MatcherInterface"

import Card from "../../Model/Card"
import Match from "../../Model/Match"
import MatchType from "../../Model/MatchType"
import MatchValue from "../../Model/MatchValue"

export default class TypeMatcher implements MatcherInterface {
    match(card: Card, target: Card): Match {
        return new Match(
            MatchType.type,
            card.type === target.type ? MatchValue.full : MatchValue.no,
        )
    }
}