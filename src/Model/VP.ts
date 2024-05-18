import Resource from "./Resource"

export interface VPConfig {
    points?: number,
    resource?: Resource,
    perResource?: number
}

export default class VP {
    constructor(private readonly props: VPConfig) {
        this.validate(props)
    }

    private validate(props: VPConfig): void {
        if (props.points && props.resource) {
            throw new Error("VP cannot have both a number and a resource")
        }

        if (props.resource && !props.perResource) {
            throw new Error("VP with a resource must have a perResource value")
        }

        if (props.points && props.perResource) {
            throw new Error("VP with a number cannot have a perResource value")
        }

        if (!props.points && !props.resource) {
            throw new Error("VP must have a number or a resource")
        }
    }

    get points(): number | null {
        return this.props.points ?? null
    }

    get resource(): Resource | null {
        return this.props.resource ?? null
    }

    get perResource(): number | null {
        return this.props.perResource ?? null
    }

    public toJSON(): VPConfig {
        return this.props
    }
}