import Tag from "./Tag"
import Type from "./Type"
import Expansion from "./Expansion"
import VP from "./VP"

export interface CardConfig {
    id: string,
    name: string,
    tags: Tag[],
    type: Type,
    cost: number,
    expansions: Expansion[],
    vp: VP|null,
}

export default class Card {
    constructor(private readonly props: CardConfig) {
    }

    get id(): string {
        return this.props.id
    }

    get name(): string {
        return this.props.name
    }

    get cost(): number {
        return this.props.cost
    }

    get tags(): Tag[] {
        return [...this.props.tags]
    }

    get expansions(): Expansion[] {
        return this.props.expansions
    }

    get type(): Type {
        return this.props.type
    }

    get vp(): VP | null {
        return this.props.vp
    }

    public toJSON(): CardConfig {
        return this.props
    }
}