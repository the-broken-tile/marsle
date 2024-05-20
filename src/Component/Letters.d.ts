import Card from "../Model/Card";
import RandomNumberGenerator from "../Service/RandomNumberGenerator";
export default class Letters {
    private readonly card;
    private readonly container;
    private readonly rng;
    private readonly onShowLetters;
    private visible;
    private name;
    private element;
    constructor(card: Card, container: HTMLDivElement, rng: RandomNumberGenerator, onShowLetters: () => void, visible: boolean);
    private mask;
    private show;
    revealLetter(): void;
}
