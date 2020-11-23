import { Card, Suit, Rank } from './card';
import { Foundation } from './foundation';
import { Pile } from './pile';
import { Deck } from './deck';
import { GameState, GameStateIOHandler, InMemoryGameStateIOHandler } from './gameState';

type CardMap = Record<string,Card>;
type FoundationMap = Record<string,Foundation>;
type PileMap = Record<string,Pile>;

export class Game {
    cardMap: CardMap = {};
    foundationMap: FoundationMap = {};
    get foundations() {
        return Object.values(this.foundationMap);
    }
    pileMap: PileMap = {};
    get piles(): Pile[] {
        return Object.values(this.pileMap);
    }
    deck: Deck;

    private get emptyFoundation(): Foundation {
        return this.foundations.find(f => f.isEmpty);
    }

    constructor(gameState?: GameState) {
        for(let i = 1; i <= 4; i++) {
            let foundation = new Foundation('F'+i);
            this.foundationMap[foundation.name] = foundation;
        }

        for(let i = 1; i <= 7; i++) {
            let pile = new Pile('P'+i);
            this.pileMap[pile.name] = pile;
        }

        this.deck = new Deck();

        if (gameState != null) {
            gameState.piles
                .map(p => Pile.fromState(p))
                .forEach(p => this.pileMap[p.name] = p);
            gameState.foundations
                .map(f => Foundation.fromState(f))
                .forEach(f => this.foundationMap[f.name] = f);
            this.deck = Deck.fromState(gameState.deck);

            // get cards from piles, foundations, and deck and add to card map
            this.piles.reduce((arr:Card[], p) => arr.concat(p.cards), [])
                .concat(this.foundations.reduce((arr:Card[], f) => arr.concat(f.cards), []))
                .concat(this.deck.hiddenCards)
                .concat(this.deck.drawnCards)
                .forEach(c => this.cardMap[c.name] = c);
        }
    }

    public static createCards(): Card[] {
        let cards = [];
        for(let i = 0; i < 4; i++) {
            const suit: Suit = i;
            for(let j = 0; j < 13; j++) {
                const rank: Rank = j;
                let card = new Card(suit, rank);
                cards.push(card);
            }
        }
        return cards;
    }

    public static shuffle(cards: Card[]): Card[] {
        let array = [...cards];
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    public deal(cards: Card[]) {
        if (cards.length != 52) {
            return;
        }
        let cardsToDeal = [...cards];
        for (let i = 0; i < 7; i++) {
            this.piles[i].deal(cardsToDeal.pop());
            for(let j = i+1; j < 7; j++) {
                this.piles[j].dealHidden(cardsToDeal.pop());
            }
        }
        this.deck.deal(cardsToDeal);
        cards.forEach(c => this.cardMap[c.name] = c);
    }

    public canMove(cardName: string, ontoName: string) {
        let card = this.cardMap[cardName];
        if (card == null) {
            return false;
        }
        if (card.collection.canTake(card)) {
            let cards = card.collection.peak(card);
            let ontoCollection = this.cardMap[ontoName]?.collection
                ?? this.pileMap[ontoName]
                ?? this.foundationMap[ontoName];
            if (ontoCollection != null) {
                return ontoCollection.canPut(cards);
            }
        }
        return false;
    }

    public move(cardName: string, ontoName: string) {
        if (this.canMove(cardName, ontoName)) {
            let card = this.cardMap[cardName];
            let ontoCollection = this.cardMap[ontoName]?.collection
                ?? this.pileMap[ontoName]
                ?? this.foundationMap[ontoName];
            let cards = card.collection.take(card);
            ontoCollection.put(cards);
        }
    }

    public newGame() {
        let cards = Game.createCards();
        cards = Game.shuffle(cards);
        this.deal(cards);
    }

    public getState(): GameState {
        return {
            piles: this.piles.map(p => p.getState()),
            foundations: this.foundations.map(f => f.getState()),
            deck: this.deck.getState()
        };
    }

    public static fromState(gameState: GameState): Game {
        return new Game(gameState);
    }
}