import Resource from "./Resource"

export interface VPConfig {
    points: number,
    resource?: Resource,
    per?: number,
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

    get per(): number | undefined {
        return this.props.per
    }

    public toJSON(): VPConfig {
        return this.props
    }
}