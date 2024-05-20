import Resource from "./Resource";
export interface VPConfig {
    points: number;
    resource?: Resource;
}
export default class VP {
    private readonly props;
    constructor(props: VPConfig);
    get points(): number;
    get resource(): Resource | undefined;
    toJSON(): VPConfig;
}
