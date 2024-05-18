import Match from "./Match";
import Card from "../../Model/Card";
export default class Matcher {
    match(card: Card, target: Card): Match[];
    private matchTags;
    private matchVP;
    private totalMatch;
}
