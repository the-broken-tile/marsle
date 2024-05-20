import MatchModel from "../Service/Matcher/Match"
import MatchType from "../Service/Matcher/MatchType"

import Expansion from "./Expansion"
import Resource from "./Resource"
import Tag from "./Tag"

import TagEnum from "../Model/Tag"

export default class Match {
    constructor(private readonly match: MatchModel) {
    }

    public toString(): string {
        return `<span class="guess guess-${this.match.type} match-${this.match.value}">${this.innerHtml()}</span>`
    }

    private innerHtml(): string {
        switch(this.match.type) {
            case MatchType.name:
                return this.match.target.name
            case MatchType.cost:
                return this.match.target.cost.toString()
            case MatchType.expansion:
                return new Expansion(this.match.target.expansion).toString()
            case MatchType.type:
                return this.match.target.type
            case MatchType.tags:
                return this.match.target.tags
                    .map((tag: TagEnum): string => new Tag(tag).toString())
                    .join("")
            case MatchType.vp:
                return this.renderVP()
        }
    }

    private renderVP(): string {
        const { vp } = this.match.target

        if (vp === null) {
            return ""
        }

        if (vp.resource) {
            return `${vp.points} / ${vp.per === 1 ? "": vp.per}${new Resource(vp.resource)}`
        }

        return `${vp.points}`
    }
}