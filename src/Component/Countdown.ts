
export default class Countdown {
    private readonly element: HTMLDivElement
    private readonly countdownElement: HTMLSpanElement
    constructor() {
        this.countdownElement = document.createElement("span")
        this.countdownElement.classList.add("countdown__time")

        this.element = document.createElement("div")
        this.element.classList.add("countdown")
        this.element.appendChild(this.countdownElement)

        document.body.appendChild(this.element)
        window.requestAnimationFrame(this.tick.bind(this))
    }

    private getTime(): number {
        const day: Date = new Date();
        const h: number = day.getHours();
        const m: number = day.getMinutes();
        const s: number = day.getSeconds();

        return 86400 - h * 3600 - m * 60 - s
    }

    private tick(): void {
        const time: number = this.getTime()
        if (time <= 0) {
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