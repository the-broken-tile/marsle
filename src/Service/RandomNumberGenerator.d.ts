export default class RandomNumberGenerator {
    private engine;
    constructor();
    setSeed(seed: number): void;
    shuffle<T>(array: T[]): void;
    get(min: number, max: number): number;
}
