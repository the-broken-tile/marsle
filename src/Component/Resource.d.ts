import ResourceEnum from "./../Model/Resource";
export default class Resource {
    private readonly resource;
    constructor(resource: ResourceEnum);
    toString(): string;
}
