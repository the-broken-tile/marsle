import TagEnum from "../Model/Tag";
export default class Tag {
    private readonly tag;
    constructor(tag: TagEnum);
    toString(): string;
}
