import { Card, CardState } from './card';
import { CardCollection } from './collection';

export class Deck implements CardCollection {
    public name: string;
    public hiddenCards: Card[] = [];
    public drawnCards: Card[] = [];

    constructor(name: string = 'Deck', drawnCards: Card[] = [], hiddenCards: Card[] = []) {
        this.name = name;
        this.drawnCards = drawnCards;
        this.drawnCards.forEach(c => c.collection = this);
        this.hiddenCards = hiddenCards;
        this.hiddenCards.forEach(c => c.collection = this);
    }

    public get lastDrawnCard(): Card {
        if (this.drawnCards.length > 0) {
            return this.drawnCards[this.drawnCards.length-1];
        }
        return null;
    }

    public get size(): number {
        return this.hiddenCards.length + this.drawnCards.length;;
    }

    public get isEmpty(): boolean {
        return this.size == 0;
    }

    public deal(cards: Card[]) {
        this.hiddenCards = [...cards];
        for(let card of this.hiddenCards) {
            card.collection = this;
        }
    }

    public draw(): Card {
        if (this.isEmpty) {
            return null;
        }
        if (this.hiddenCards.length == 0) {
            this.hiddenCards = this.drawnCards;
            this.drawnCards = [];
        }
        let drawnCard = this.hiddenCards.shift();
        this.drawnCards.push(drawnCard);
        return drawnCard;
    }

    public canTake(card: Card): boolean {
        if (this.drawnCards.length == 0) {
            return false;
        }
        if (this.lastDrawnCard.name != card.name) {
            return false;
        }
        return true;
    }

    public canPut(cards: Card[]): boolean {
        throw new Error('Method not implemented.');
    }

    public peak(card: Card): Card[] {
        if (this.canTake(card)) {
            return [this.lastDrawnCard];
        }
        return null;
    }

    public take(card: Card): Card[] {
        if (this.canTake(card)) {
            return [this.drawnCards.pop()];
        }
        return null;
    }

    public put(cards: Card[]): void {
        throw new Error('Not allowed to place cards back on deck');
    }

    public getState(): DeckState {
        return {
            name: this.name,
            hiddenCards: this.hiddenCards.map(c => c.getState()),
            drawnCards: this.drawnCards.map(c => c.getState())
        };
    }

    public static fromState(deckState: DeckState): Deck {
        return new Deck(
            deckState.name,
            deckState.drawnCards.map(c => Card.fromState(c)),
            deckState.hiddenCards.map(c => Card.fromState(c))
        );
    }

}

export interface DeckState {
    name: string,
    hiddenCards: CardState[],
    drawnCards: CardState[]
}