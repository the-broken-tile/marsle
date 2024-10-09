import MatcherInterface from "./MatcherInterface"

import Card from "../../Model/Card"
import Match from "../../Model/Match"
import MatchType from "../../Model/MatchType"
import MatchValue from "../../Model/MatchValue"
import Tag from "../../Model/Tag"

export default class TagMatcher implements MatcherInterface {
    match(card: Card, target: Card): Match {
        const sorter = (a: Tag, b: Tag): number => `${a}`.localeCompare(`${b}`)
        const cardTags: string = card.tags.sort(sorter).join("")
        const targetTags: string = target.tags.sort(sorter).join("")
        if (cardTags === targetTags) {
            return new Match(MatchType.tags, MatchValue.full)
        }

        return card.tags
            .reduce((carry: Match, tag: Tag): Match => {
                if (target.tags.includes(tag)) {
                    return new Match(MatchType.tags, MatchValue.partial)
                }

                return carry
            }, new Match(MatchType.tags, MatchValue.no))
    }
}