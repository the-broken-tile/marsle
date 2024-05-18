const PREFIX: "marsle_" = "marsle_"

export default class Store {
    private readonly storage: Storage

    constructor() {
        this.storage = window.localStorage
    }

    public get<T>(key: string): T | null {
        const item: string | null = this.storage.getItem(`${PREFIX}${key}`)

        if (item === null) {
            return null
        }

        return JSON.parse(item) as T
    }

    public set<T>(key: string, value: T): void {
        this.storage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
    }
}