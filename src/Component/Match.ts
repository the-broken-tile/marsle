import Expansion from "./Expansion"
import Resource from "./Resource"
import Tag from "./Tag"

import Guess from "../Model/Guess"
import MatchModel from "../Model/Match"
import MatchType from "../Model/MatchType"
import TagEnum from "../Model/Tag"

export default class Match {
    constructor(private readonly guess: Guess, private readonly match: MatchModel) {
    }

    public toString(): string {
        return `<span class="guess guess-${this.match.type} match-${this.match.value}">${this.innerHtml()}</span>`
    }

    private innerHtml(): string {
        switch(this.match.type) {
            case MatchType.name:
                return this.guess.card.name
            case MatchType.cost:
                return this.guess.card.cost.toString()
            case MatchType.expansion:
                return new Expansion(this.guess.card.expansion).toString()
            case MatchType.type:
                return this.guess.card.type
            case MatchType.tags:
                return this.guess.card.tags
                    .map((tag: TagEnum): string => new Tag(tag).toString())
                    .join("")
            case MatchType.vp:
                return this.renderVP()
        }
    }

    private renderVP(): string {
        const { vp } = this.guess.card

        if (vp === null) {
            return ""
        }

        if (vp.resource) {
            return `${vp.points} / ${vp.per === 1 ? "": vp.per}${new Resource(vp.resource)}`
        }

        return `${vp.points}`
    }
}