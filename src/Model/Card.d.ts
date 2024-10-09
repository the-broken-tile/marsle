import Tag from "./Tag";
import Type from "./Type";
import Expansion from "./Expansion";
import VP from "./VP";
export interface CardConfig {
    id: string;
    name: string;
    tags: Tag[];
    type: Type;
    cost: number;
    expansions: Expansion[];
    vp: VP | null;
}
export default class Card {
    private readonly props;
    constructor(props: CardConfig);
    get id(): string;
    get name(): string;
    get cost(): number;
    get tags(): Tag[];
    get expansions(): Expansion[];
    get type(): Type;
    get vp(): VP | null;
    toJSON(): CardConfig;
}
