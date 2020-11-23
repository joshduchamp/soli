import { Card, Color, Rank, CardState } from './card';
import { CardCollection } from './collection';

export class Pile implements CardCollection {
    public name: string;
    public cards: Card[] = [];

    constructor(name?: string, cards: Card[] = []) {
        this.name = name;
        cards.forEach(c => this.deal(c));
    }

    public get size(): number {
        return this.cards.length;
    }

    public get isEmpty(): boolean {
        return this.cards.length == 0;
    }

    public get topCard(): Card {
        return this.isEmpty
            ? null
            : this.cards[this.size-1];
    }

    private get color(): Color {
        return this.isEmpty
            ? null
            : this.topCard.color;
    }

    private get nextColor(): Color {
        if (this.isEmpty) {
            return null;
        }
        return this.color == Color.Black ? Color.Red : Color.Black;
    }

    private get rank(): Rank {
        return this.isEmpty
            ? null
            : this.topCard.rank;
    }

    private get nextRank(): Rank {
        if (this.isEmpty) {
            return null;
        }
        if (this.rank == Rank.Ace) {
            return null;
        }
        return this.rank-1;
    }

    public canPut(cards: Card[]): boolean {
        if (cards.length == 0) {
            return false;
        }
        if (this.isEmpty && cards[0].rank == Rank.King) {
            return true;
        }
        if (!this.isEmpty && this.nextColor == cards[0].color && this.nextRank == cards[0].rank ) {
            return true;
        }
        return false;
    }

    public put(cards: Card[]) {
        if (this.canPut(cards)) {
            this.cards = this.cards.concat(cards);
            for(let card of cards) {
                card.collection = this;
            }
        }
    }

    public deal(card: Card) {
        card.collection = this;
        this.cards.push(card);
    }

    public dealHidden(card: Card) {
        card.isHidden = true;
        this.deal(card);
    }

    public take(card: Card): Card[] {
        if (this.canTake(card)) {
            let index = this.cards.findIndex((c) => c.name == card.name);
            let cardsToTake = this.cards.splice(index,this.cards.length);
            if (!this.isEmpty) {
                this.topCard.isHidden = false;
            }
            return cardsToTake;
        }
        return null;
    }

    public canTake(card: Card): boolean {
        let index = this.cards.findIndex((c) => {
            return c.name == card.name && !c.isHidden;
        });
        return index != -1;
    }

    public peak(card: Card): Card[] {
        if (this.canTake(card)) {
            let index = this.cards.findIndex(c => c.name == card.name);
            return this.cards.slice(index,this.cards.length);
        }
        return null;
    }

    public getState(): PileState {
        return {
            name: this.name,
            cards: this.cards.map(c => c.getState())
        };
    }

    public static fromState(pileState: PileState): Pile {
        return new Pile(
            pileState.name,
            pileState.cards.map(c => Card.fromState(c))
        );
    }
}

export interface PileState {
    name: string;
    cards: CardState[];
}