import { Collection } from 'typescript';
import { Card, Suit, CardState } from './card';
import { CardCollection } from './collection';

export class Foundation implements CardCollection {
    public name: string;
    public cards: Card[] = [];

    constructor(name?: string, cards: Card[] = []) {
        this.name = name;
        cards.forEach(c => this.put([c]));
    }

    public get size() : number {
        return this.cards.length;
    }

    public get isEmpty() : boolean {
        return this.cards.length == 0;
    }
    
    public get suit() : Suit {
        if (this.isEmpty) {
            return null;
        }
        return this.cards[0].suit;
    }

    public get topCard() : Card {
        if (this.isEmpty) {
            return null;
        }
        return this.cards[this.size-1];
    }

    public canPut(cards: Card[]): boolean {
        if (cards.length > 1) {
            return false;
        }
        let card = cards[0];
        return (this.isEmpty || this.suit == card.suit) && this.size == card.rank;
    }
    
    public put(cards: Card[]) {
        if (this.canPut(cards)) {
            let card = cards[0];
            this.cards.push(card);
            card.collection = this;
        }
    }

    public take(card: Card): Card[] {
        if (this.canTake(card)) {
            return [this.cards.pop()];            
        }
        return null;
    }

    public canTake(card: Card): boolean {
        if (this.isEmpty) {
            return false;
        }
        if (this.topCard.name != card.name) {
            return false;
        }
        return true;

    }

    public peak(card: Card): Card[] {
        if (this.canTake(card)) {
            return [this.topCard];
        }
        return null;
    }

    public getState(): FoundationState {
        return {
            name: this.name,
            cards: this.cards.map(c => c.getState())
        };
    }

    public static fromState(foundationState: FoundationState): Foundation {
        return new Foundation(
            foundationState.name,
            foundationState.cards.map(c => Card.fromState(c))
        );
    }
}

export interface FoundationState {
    name: string,
    cards: CardState[]
}