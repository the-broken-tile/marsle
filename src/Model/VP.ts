import Resource from "./Resource"

export interface VPConfig {
    points: number,
    resource?: Resource,
}

export default class VP {
    constructor(private readonly props: VPConfig) {
    }

    get points(): number {
        return this.props.points
    }

    get resource(): Resource | undefined {
        return this.props.resource
    }

    public toJSON(): VPConfig {
        return this.props
    }
}