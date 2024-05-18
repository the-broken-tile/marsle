export default class Store {
    private readonly storage;
    constructor();
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
}
