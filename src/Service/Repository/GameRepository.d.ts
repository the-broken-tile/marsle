import Store from "../Store";
import Game from "../../Model/Game";
export default class GameRepository {
    private readonly store;
    constructor(store: Store);
    find(day: number): Game | undefined;
    get(day: number): Game;
    save(stats: Game): void;
}
