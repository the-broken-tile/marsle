import MatcherInterface from "./Matcher/MatcherInterface"

import Card from "../Model/Card"
import Match from "../Model/Match"
import MatchValue from "../Model/MatchValue"
import MatchType from "../Model/MatchType"

export default class Matcher {
    constructor(private readonly matchers: MatcherInterface[]) {
    }
    public match(card: Card, target: Card): Match[]  {
        if (card === target) {
            return this.fullMatch()
        }

        return this.matchers.map((matcher: MatcherInterface): Match => matcher.match(card, target))
    }

    private fullMatch(): Match[] {
        return [
            new Match(MatchType.name, MatchValue.full),
            new Match(MatchType.cost, MatchValue.full),
            new Match(MatchType.expansion, MatchValue.full),
            new Match(MatchType.type, MatchValue.full),
            new Match(MatchType.tags, MatchValue.full),
            new Match(MatchType.vp, MatchValue.full),
        ]
    }
}