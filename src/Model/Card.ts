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
    expansion: Expansion,
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

    get expansion(): Expansion {
        return this.props.expansion
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