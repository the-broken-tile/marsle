
import MatchType from "./MatchType"
import MatchValue from "./MatchValue"

export default class Match {
    constructor(
        public readonly type: MatchType,
        public readonly value: MatchValue
    ) {
    }
}