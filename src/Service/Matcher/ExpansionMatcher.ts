import MatcherInterface from "./MatcherInterface"

import Card from "../../Model/Card"
import Match from "../../Model/Match"
import Expansion from "../../Model/Expansion"
import MatchType from "../../Model/MatchType"
import MatchValue from "../../Model/MatchValue"

export default class ExpansionMatcher implements MatcherInterface {
    match(card: Card, target: Card): Match {
        const sorter = (a: Expansion, b: Expansion): number => `${a}`.localeCompare(`${b}`)
        const cardExpansions: string = card.expansions.sort(sorter).join("")
        const targetExpansions: string = target.expansions.sort(sorter).join("")
        if (cardExpansions === targetExpansions) {
            return new Match(MatchType.expansion, MatchValue.full)
        }

        return card.expansions
            .reduce((carry: Match, expansion: Expansion): Match => {
                if (target.expansions.includes(expansion)) {
                    return new Match(MatchType.expansion, MatchValue.partial)
                }

                return carry
            }, new Match(MatchType.expansion, MatchValue.no))
    }
}