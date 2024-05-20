import ResourceEnum from "./../Model/Resource"

export default class Resource {
    constructor(private readonly resource: ResourceEnum) {
    }

    public toString(): string {
        return `<span class="resource resource-${this.resource}">${this.resource}</span>`
    }
}