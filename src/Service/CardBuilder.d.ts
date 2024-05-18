import Card from "../Model/Card";
import { VPConfig } from "../Model/VP";
import RandomNumberGenerator from "./RandomNumberGenerator";
interface CardConfig {
    id: string;
    name: string;
    tags: string[];
    type: string;
    cost: number;
    expansion: string;
    vp?: VPConfig | null;
}
export default class CardBuilder {
    private readonly props;
    private readonly rng;
    private cached;
    constructor(props: any[], rng: RandomNumberGenerator);
    get(id: string): Card;
    build(config: CardConfig): Card;
    random(): Card;
}
export {};
