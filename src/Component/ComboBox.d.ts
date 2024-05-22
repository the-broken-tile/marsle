export interface Option {
    id: string;
    text: string;
}
export default class ComboBox {
    private readonly element;
    private readonly options;
    private readonly onSelect;
    private readonly empty;
    constructor(element: HTMLSelectElement, options: Option[], onSelect: Function);
    remove(id: string): void;
    private handleChange;
}
