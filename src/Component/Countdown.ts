export default class Countdown {
    private readonly element: HTMLDivElement
    private readonly countdownElement: HTMLSpanElement
    constructor(private readonly time: number) {
        this.countdownElement = document.createElement("span")
        this.countdownElement.classList.add("countdown__time")

        this.element = document.createElement("div")
        this.element.classList.add("countdown")
        this.element.appendChild(this.countdownElement)

        document.body.appendChild(this.element)
        window.requestAnimationFrame(this.tick.bind(this))
    }

    private getTime(): number {
        return Math.floor((this.time - Date.now()) / 1000)
    }

    private tick(): void {
        if (Date.now() > this.time) {
            window.location.reload()
        } else {
            this.countdownElement.innerText = this.text()
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