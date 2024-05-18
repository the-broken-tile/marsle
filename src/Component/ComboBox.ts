export interface Option {
    id: string
    text: string
}

export default class ComboBox {
    private readonly empty: HTMLOptionElement

    constructor(
        private readonly element: HTMLSelectElement,
        private readonly options: Option[],
        private readonly onSelect: Function,
    ) {
        this.empty = document.createElement("option")
        this.empty.textContent = "Select an option"
        this.empty.value = ""
        this.element.appendChild(this.empty)

        this.options
            .sort((a: Option, b: Option): number => a.text.localeCompare(b.text))
            .forEach((option: Option): void => {
                const element: HTMLOptionElement = document.createElement("option")
                element.textContent = option.text
                element.value = option.id.toString()
                this.element.appendChild(element)
            })

        this.init()
    }


    private init(): void {
        this.element.addEventListener("change", (): void => {
            this.onSelect(this.element.value)
            this.element.selectedIndex = 0
        })
    }
}