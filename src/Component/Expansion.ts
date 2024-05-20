import ExpansionEnum from "../Model/Expansion"

export default class Expansion {
    constructor(private readonly expansion: ExpansionEnum) {
    }

    public toString(): string {
        return `<span class="expansion expansion-${this.expansion.replace(' ','-')}">${this.expansion}</span>`
    }
}