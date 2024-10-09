import MatcherInterface from "./MatcherInterface"

import Card from "../../Model/Card"
import Match from "../../Model/Match"
import MatchType from "../../Model/MatchType"
import MatchValue from "../../Model/MatchValue"
import Resource from "../../Model/Resource"
import VP from "../../Model/VP"

export default class VpMatcher implements MatcherInterface {
    match(card: Card, target: Card): Match {
        const cardVP: VP | null = card.vp
        const targetVP: VP | null = target.vp

        if (cardVP === null) {
            if (targetVP === null) {
                return new Match(MatchType.vp, MatchValue.full)
            }

            return new Match(MatchType.vp, MatchValue.no)
        }

        if (targetVP === null) {
            return new Match(MatchType.vp, MatchValue.no)
        }

        const cardPoints: number = cardVP.points
        const targetPoints: number = targetVP.points
        const cardResource: Resource | undefined = cardVP.resource
        const targetResource: Resource | undefined = targetVP.resource

        if (cardResource === undefined) {
            if (targetResource === undefined) {
                //MatchValue.full higher/lower
                if (cardPoints === targetPoints) {
                    return new Match(MatchType.vp, MatchValue.full)
                }
                if (cardPoints < targetPoints) {
                    return new Match(MatchType.vp, MatchValue.lower)
                }

                return new Match(MatchType.vp, MatchValue.higher)
            }

            return new Match(MatchType.vp, MatchValue.partial)
        }

        if (targetPoints !== null) {
            return new Match(MatchType.vp, MatchValue.partial)
        }

        return new Match(
            MatchType.vp,
            (cardResource !== targetResource) || (cardPoints !== targetPoints)
                ? MatchValue.partial
                : MatchValue.full,
        )
    }
}