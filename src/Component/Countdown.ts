export default class Countdown {
    private readonly element: HTMLSpanElement

    constructor(private readonly time: number, private readonly container: HTMLDivElement) {
        this.element = document.createElement("span")
        this.element.classList.add("countdown__time")

        this.container.appendChild(this.element)

        window.requestAnimationFrame(this.tick.bind(this))
    }

    private getTime(): number {
        return Math.floor((this.time - Date.now()) / 1000)
    }

    private tick(): void {
        if (Date.now() > this.time) {
            window.location.reload()
        } else {
            this.element.innerText = this.text()
            window.requestAnimationFrame(this.tick.bind(this))
        }
    }

    private text(): string {
        const time: number = this.getTime()

        return `Time until next card: ${this.pad(Math.floor(time / 3600))}:${this.pad(Math.floor(time / 60) % 60)}:${this.pad(time % 60)}`
    }

    private pad(num: number): string {
        return num < 10 ? `0${num}` : `${num}`
    }
}