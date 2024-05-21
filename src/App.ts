import cards from "./cards.json"
import {DEBUG, GUESSES, TIME} from "./constants"

import CardBuilder from "./Service/CardBuilder"
import RandomNumberGenerator from "./Service/RandomNumberGenerator"
import Matcher from "./Service/Matcher"
import Store from "./Service/Store"

import Card from "./Model/Card"
import Game from "./Model/Game"
import Guess from "./Model/Guess"
import Match from "./Model/Match"
import MatchValue from "./Model/MatchValue"
import State from "./Model/State"

import ComboBox, {Option} from "./Component/ComboBox"
import Grid from "./Component/Grid"
import Countdown from "./Component/Countdown"
import Letters from "./Component/Letters"
import GameRepository from "./Service/Repository/GameRepository"

export default class App {
    private day: number = Math.floor(Date.now() / TIME)
    private readonly rng: RandomNumberGenerator = new RandomNumberGenerator()
    private readonly builder: CardBuilder = new CardBuilder(cards, this.rng)
    private readonly matcher: Matcher = new Matcher()
    private readonly comboBox: ComboBox
    private readonly card!: Card
    private readonly grid: Grid
    private readonly store: Store = new Store()
    private readonly gameRepository: GameRepository = new GameRepository(this.store)
    private readonly letters!: Letters

    constructor() {
        // Seed with the current day.
        this.rng.setSeed(this.day)
        this.comboBox = new ComboBox(
            <HTMLSelectElement>document.getElementById("input"),
            cards.map((card: {name: string, id: string}) => ({text: card.name, id: card.id} as Option)),
            this.onSelect.bind(this),
        )

        this.grid = new Grid(6, <HTMLDivElement>document.getElementById("grid"))

        const game: Game = this.gameRepository.find(this.day) ?? Game.empty(this.day)
        this.gameRepository.save(game)

        DEBUG && console.log(game)
        if (game.state !== State.playing) {
            this.initCountDown()
        } else {
            this.card = this.builder.random()
            DEBUG && console.log(this.card)

            this.letters = new Letters(
                this.card,
                <HTMLDivElement>document.getElementById("letters__container"),
                this.rng,
                this.showLetters.bind(this),
                game.showLetters,
            )
            this.load(game)
        }

    }

    private load(game: Game): void {
        const guesses: Guess[] = game.guesses
        guesses.forEach((guess: Guess) => this.grid.addGuess(guess))
        guesses.forEach((guess: Guess): void => {
            this.comboBox.remove(guess.card.id)

            this.revealLetters(guess.matches)
        })
    }

    private onSelect(selected: string): void {
        const game: Game = this.gameRepository.get(this.day)

        if (game.state !== State.playing) {
            return
        }

        const guessed: Card = this.builder.get(selected)
        const matches: Match[] = this.matcher.match(this.card, guessed)
        const guess: Guess = new Guess(guessed, matches)
        this.revealLetters(matches)
        game.guesses.push(guess)

        this.gameRepository.save(game)
        this.grid.addGuess(guess)

        if (guessed.id === this.card.id) {
            game.state = State.Won
            this.gameRepository.save(game)

            setTimeout((): void => {
                alert("You won!")

                this.initCountDown()
            }, 0)

            return
        }

        if (game.guesses.length === GUESSES) {
            game.state = State.Lost
            this.gameRepository.save(game)

            this.grid.addGuess(new Guess(this.card, this.matcher.match(this.card, this.card)))
            alert(`You lost! The card was ${this.card.name}`)
        }
    }

    private revealLetters(matches: Match[]): void {
        const letters: number = matches.filter(m => m.value === MatchValue.full).length
        for (let i = 0; i < letters; i++) {
            this.letters.revealLetter()
        }
    }

    private showLetters(): void {
        const game: Game = this.gameRepository.get(this.day)
        game.showLetters = true
        this.gameRepository.save(game)
    }

    private initCountDown(): void {
        const element: HTMLDivElement = document.createElement("div")
        element.classList.add("countdown")
        document.body.appendChild(element)

        new Countdown(Math.ceil(Date.now() / TIME) * TIME, element)
    }
}