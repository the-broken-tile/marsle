import Card from "../Model/Card"
import Type from "../Model/Type"
import Tag from "../Model/Tag"
import Expansion from "../Model/Expansion"
import VP, {VPConfig} from "../Model/VP"

import RandomNumberGenerator from "./RandomNumberGenerator"

interface CardConfig {
    id: string,
    name: string,
    tags: string[],
    type: string,
    cost: number,
    expansion: string,
    vp?: VPConfig|null

}
export default class CardBuilder {
    private cached: Map<string, Card> = new Map<string, Card>()

    constructor(private readonly props: any[], private readonly rng: RandomNumberGenerator) {
    }

    public get(id: string): Card {
        const config = this.props.find((card: {id: string}): boolean => card.id === id)

        return this.build(config)
    }

    public build(config: CardConfig): Card {
        if (!this.cached.has(config.id)) {
            this.cached.set(config.id,
                new Card({
                    id: config.id,
                    name: config.name,
                    tags: config.tags as Tag[],
                    type: <Type>config.type,
                    cost: config.cost,
                    expansion: config.expansion as Expansion,
                    vp: (config.vp === null || config.vp === undefined) ? null : new VP(config.vp),
                })
            )
        }

        return this.cached.get(config.id) as Card
    }

    public random(): Card {
        const config = this.props[this.rng.get(0, this.props.length - 1)]

        return this.build(config)
    }
}