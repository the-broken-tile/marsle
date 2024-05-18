import MatchType from "./MatchType";
import MatchValue from "./MatchValue";
import Card from "../../Model/Card";
export default class Match {
    readonly target: Card;
    readonly type: MatchType;
    readonly value: MatchValue;
    constructor(target: Card, type: MatchType, value: MatchValue);
}
