import cards from "./cards.json"
import {GUESSES} from "./constants"

import CardBuilder from "./Service/CardBuilder"
import RandomNumberGenerator from "./Service/RandomNumberGenerator"
import Match from "./Service/Matcher/Match"
import Matcher from "./Service/Matcher/Matcher"
import Store from "./Service/Store";

import Card from "./Model/Card"
import Stats from "./Model/Stats"

import ComboBox, {Option} from "./Component/ComboBox"
import Grid from "./Component/Grid"
import Countdown from "./Component/Countdown"


enum State {
    playing = "playing",
    Won = "won",
    Lost = "lost",
}

export default class App {
    private day: number = Math.floor(Date.now() / 86400000)
    private state: string = State.playing
    private readonly builder: CardBuilder
    private readonly matcher: Matcher
    private readonly rng: RandomNumberGenerator
    private readonly comboBox: ComboBox
    private readonly card!: Card
    private readonly guesses: Match[][] = []
    private readonly grid: Grid
    private readonly store: Store

    constructor() {
        this.rng = new RandomNumberGenerator()
        // Seed with the current day.
        this.rng.setSeed(this.day)

        this.builder = new CardBuilder(cards, this.rng)
        this.matcher = new Matcher()
        this.comboBox = new ComboBox(
            <HTMLSelectElement>document.getElementById("input"),
            cards.map((card: {name: string, id: string}) => ({text: card.name, id: card.id} as Option)),
            this.onSelect.bind(this),
        )

        this.grid = new Grid(6, <HTMLDivElement>document.getElementById("grid"))
        this.store = new Store()

        const stats: Stats[] = this.store.get<Stats[]>("stats") ?? []
        const today: Stats|undefined = stats.find((stat: Stats) => stat.day === this.day)
        if (today) {
            this.state = today.won ? State.Won : State.Lost
            new Countdown()
        } else {
            this.card = this.builder.random()
            this.load()
        }

    }

    private load(): void {
        const guesses: Match[][] = this.store.get<Match[][]>(`guesses_${this.day}`) as Match[][] ?? []
        this.guesses.push(...guesses)
        this.guesses.forEach((matches: Match[]) => this.grid.addRow(matches))
    }

    private onSelect(selected: string): void {
        if (this.state !== State.playing) {
            return
        }

        const guessed: Card = this.builder.get(selected)
        const matches: Match[] = this.matcher.match(this.card, guessed)

        this.guesses.push(matches)
        this.store.set<Match[][]>(`guesses_${this.day}`, this.guesses)
        this.grid.addRow(matches)

        if (guessed.id === this.card.id) {
            this.state = State.Won
            const stats: Stats[] = this.store.get<Stats[]>("stats") ?? []
            stats.push(new Stats(this.day, this.guesses.length, true))
            this.store.set<Stats[]>("stats", stats)

            setTimeout((): void => {
                alert("You won!")

                new Countdown()
            }, 0)

            return
        }

        if (this.guesses.length === GUESSES) {
            this.state = State.Lost

            const stats: Stats[] = this.store.get<Stats[]>("stats") ?? []
            stats.push(new Stats(this.day, this.guesses.length, false))
            this.store.set<Stats[]>("stats", stats)

            this.grid.addRow(this.matcher.match(this.card, this.card))
            alert(`You lost! The card was ${this.card.name}`)
        }
    }
}