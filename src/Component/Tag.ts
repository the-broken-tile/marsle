import TagEnum from "../Model/Tag"

export default class Tag {
    constructor(private readonly tag: TagEnum) {
    }

    public toString(): string {
        return `<span class="tag tag-${this.tag}">${this.tag}</span>`
    }
}