import Card from "../Model/Card"
import RandomNumberGenerator from "../Service/RandomNumberGenerator"

export default class Letters {
    private name: string
    private element: HTMLDivElement

    constructor(
        private readonly card: Card,
        private readonly container: HTMLDivElement,
        private readonly rng: RandomNumberGenerator,
        private readonly onShowLetters: () => void,
        private visible: boolean,
    ) {
        this.name = this.mask()
        this.element = document.createElement("div")
        this.element.id = "letters"
        this.element.innerText = this.name
        this.container.appendChild(this.element)
        this.container.addEventListener("click", this.show.bind(this))
        this.visible && this.show()
    }

    private mask(): string {
        return this.card.name
            .split("")
            .map((letter: string): string => letter === " " ? " " : "_")
            .join("")
    }

    private show(): void {
        this.container.classList.add("revealed")
        this.onShowLetters()
    }

    public revealLetter(): void {
        if (this.name === this.card.name) {
            return
        }

        const letterIndices: number[] = this.card.name.split("")
            .reduce<number[]>((acc: number[], letter: string, index: number): number[] => {
                if (letter !== "_") {
                    return acc
                }

                acc.push(index)

                return acc

            }, [])

        const i: number = this.rng.get(0, letterIndices.length - 1)
        this.name = this.name.slice(0, i) + this.card.name[i] + this.name.slice(i + 1)

        this.element.innerText = this.name
    }
}