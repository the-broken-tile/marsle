import MatchType from "./MatchType";
import MatchValue from "./MatchValue";
export default class Match {
    readonly type: MatchType;
    readonly value: MatchValue;
    constructor(type: MatchType, value: MatchValue);
}
