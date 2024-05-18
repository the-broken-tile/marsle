import MatchModel from "../Service/Matcher/Match"
import MatchValue from "../Service/Matcher/MatchValue"
import MatchType from "../Service/Matcher/MatchType"

export default class Match {
    constructor(private readonly match: MatchModel) {
    }

    public toString(): string {
        return `<span class="guess guess-${this.match.type} ${this.getClassName()}">${this.text()}</span>`
    }

    private text(): string {
        switch(this.match.type) {
            case MatchType.name:
                return this.match.target.name
            case MatchType.cost:
                return this.renderCost()
            case MatchType.expansion:
                return this.match.target.expansion
            case MatchType.type:
                return this.match.target.type
            case MatchType.tags:
                return this.match.target.tags.join(", ")
            case MatchType.vp:
                return this.renderVP()
        }
    }

    private renderCost(): string {
        if (this.match.value === MatchValue.full) {
            return this.match.target.cost.toString()
        }

        return `${this.match.target.cost.toString()} ${this.match.value === MatchValue.higher ? "👆" : "👇"}`
    }

    private getClassName(): string {
        if (this.match.type === MatchType.name) {
            return this.match.value === MatchValue.full ? "full-match" : ""
        }

        if (this.match.value === MatchValue.full) {
            return "full-match"
        }

        if (this.match.value === MatchValue.no) {
            return "no-match"
        }

        return "partial-match"
    }

    private renderVP(): string {
        if (this.match.target.vp === null) {
            return ""
        }
        const { vp } = this.match.target

        if (vp.points) {
            return `${vp.points}`
        }

        return `${vp.perResource} / ${vp.resource}`
    }
}