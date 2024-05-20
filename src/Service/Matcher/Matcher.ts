import Match from "./Match"
import MatchValue from "./MatchValue"

import MatchType from "./MatchType"
import Card from "../../Model/Card"
import Tag from "../../Model/Tag"
import VP from "../../Model/VP"
import Resource from "../../Model/Resource"

export default class Matcher {
    public match(card: Card, target: Card): Match[]  {
        if (card === target) {
            return this.totalMatch(target)
        }

        const result: Match[] = []
        result.push(
            new Match(
                target,
                MatchType.name,
                card.name === target.name ? MatchValue.full : MatchValue.no,
            ),
        )

        if (card.cost === target.cost) {
            result.push(new Match(target, MatchType.cost, MatchValue.full))
        } else if (card.cost < target.cost) {
            result.push(new Match(target, MatchType.cost, MatchValue.lower))
        } else {
            result.push(new Match(target, MatchType.cost, MatchValue.higher))
        }

        result.push(
            new Match(
                target,
                MatchType.expansion,
                card.expansion === target.expansion ? MatchValue.full : MatchValue.no,
            ),
        )

        result.push(
            new Match(
                target,
                MatchType.type,
                card.type === target.type ? MatchValue.full : MatchValue.no,
            ),
        )

        result.push(this.matchTags(card, target))
        result.push(this.matchVP(card, target))

        return result
    }

    private matchTags(card: Card, target: Card): Match {
        const sorter = (a: Tag, b: Tag): number => `${a}`.localeCompare(`${b}`)
        const cardTags: string = card.tags.sort(sorter).join("")
        const targetTags: string = target.tags.sort(sorter).join("")
        if (cardTags === targetTags) {
            return new Match(target, MatchType.tags, MatchValue.full)
        }


        return card.tags
            .reduce((carry: Match, tag: Tag): Match => {
                if (target.tags.includes(tag)) {
                    return new Match(target, MatchType.tags, MatchValue.partial)
                }

                return carry
            }, new Match(target, MatchType.tags, MatchValue.no))
    }

    private matchVP(card: Card, target: Card): Match {
        const cardVP: VP | null = card.vp
        const targetVP: VP | null = target.vp

        if (cardVP === null) {
            if (targetVP === null) {
                return new Match(target, MatchType.vp, MatchValue.full)
            }

            return new Match(target, MatchType.vp, MatchValue.no)
        }

        if (targetVP === null) {
            return new Match(target, MatchType.vp, MatchValue.no)
        }

        const cardPoints: number = cardVP.points
        const targetPoints: number = targetVP.points
        const cardResource: Resource | undefined = cardVP.resource
        const targetResource: Resource | undefined = targetVP.resource

        if (cardResource === undefined) {
            if (targetResource === undefined) {
                //MatchValue.full higher/lower
                if (cardPoints === targetPoints) {
                    return new Match(target, MatchType.vp, MatchValue.full)
                }
                if (cardPoints < targetPoints) {
                    return new Match(target, MatchType.vp, MatchValue.lower)
                }

                return new Match(target, MatchType.vp, MatchValue.higher)
            }

            return new Match(target, MatchType.vp, MatchValue.partial)
        }

        if (targetPoints !== null) {
            return new Match(target, MatchType.vp, MatchValue.partial)
        }

        return new Match(
            target,
            MatchType.vp,
            (cardResource !== targetResource) || (cardPoints !== targetPoints)
                ? MatchValue.partial
                : MatchValue.full,
        )
    }

    private totalMatch(target: Card): Match[] {
        return [
            new Match(target, MatchType.name, MatchValue.full),
            new Match(target, MatchType.cost, MatchValue.full),
            new Match(target, MatchType.tags, MatchValue.full),
            new Match(target, MatchType.expansion, MatchValue.full),
            new Match(target, MatchType.type, MatchValue.full),
            new Match(target, MatchType.vp, MatchValue.full),
        ]
    }
}