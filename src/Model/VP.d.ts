import Resource from "./Resource";
export interface VPConfig {
    points?: number;
    resource?: Resource;
    perResource?: number;
}
export default class VP {
    private readonly props;
    constructor(props: VPConfig);
    private validate;
    get points(): number | null;
    get resource(): Resource | null;
    get perResource(): number | null;
    toJSON(): VPConfig;
}
