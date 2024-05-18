import {MersenneTwister19937, shuffle, Engine, integer } from "random-js"

export default class RandomNumberGenerator {
    private engine: Engine

    constructor() {
        this.engine = MersenneTwister19937.autoSeed()
    }

    public setSeed(seed: number): void {
        this.engine = MersenneTwister19937.seed(seed)
    }

    public shuffle<T>(array: T[]): void {
        shuffle(this.engine, array)
    }

    public get(min: number, max: number): number {
        return integer(min, max)(this.engine)
    }
}