import {DEBUG} from "../../constants"

import Store from "../Store"

import Game from "../../Model/Game"

const KEY: "games" = "games"

export default class GameRepository {
    constructor(private readonly store: Store) {
    }

    public find(day: number): Game|undefined {
        const stats: Game[] = this.store.get<Game[]>(KEY) ?? []

        return stats.find((stat: Game) => stat.day === day)
    }

    public get(day: number): Game {
        return this.find(day)!
    }

    public save(stats: Game): void {
        const current: Game[] = this.store.get<Game[]>(KEY) ?? []
        const updated: Game[] = current.filter((stat: Game): boolean => stat.day !== stats.day)
        updated.push(stats)
        this.store.set(KEY, updated)
        DEBUG && console.log({action: "save", stats})
    }
}