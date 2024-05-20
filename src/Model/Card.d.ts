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
    expansion: Expansion;
    vp: VP | null;
}
export default class Card {
    private readonly props;
    constructor(props: CardConfig);
    get id(): string;
    get name(): string;
    get cost(): number;
    get tags(): Tag[];
    get expansion(): Expansion;
    get type(): Type;
    get vp(): VP | null;
    toJSON(): CardConfig;
}
