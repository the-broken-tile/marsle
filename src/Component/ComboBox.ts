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

        this.element.addEventListener("change", this.handleChange.bind(this))
    }

    public remove(id: string): void {
        const option: HTMLOptionElement|null = this.element.querySelector(`option[value="${id}"]`)
        option?.remove()
        this.element.selectedIndex = 0
    }

    private handleChange(): void {
        const { value } = this.element

        this.onSelect(value)
        this.remove(value)
    }
}