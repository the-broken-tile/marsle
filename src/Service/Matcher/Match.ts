import MatchType from "./MatchType"
import MatchValue from "./MatchValue"
import Card from "../../Model/Card"

export default class Match {
    constructor(
        public readonly target: Card,
        public readonly type: MatchType,
        public readonly value: MatchValue
    ) {
    }
}