import { CardCollection } from './collection';

export class Card {
    suit: Suit;
    rank: Rank;
    isHidden: boolean = false;
    collection: CardCollection = null;

    public get color() : Color {
        if (this.suit == Suit.Clubs || this.suit == Suit.Spades) {
            return Color.Black;
        }
        return Color.Red;
    }

    public get id(): number {
        return (this.suit*13) + this.rank;
    }

    public get name(): string {
        let name = '';
        switch (this.rank) {
            case Rank.Ace:
            case Rank.Jack:
            case Rank.Queen:
            case Rank.King:
                name += Rank[this.rank][0];
                break;
            default:
                name += (this.rank+1).toString();
        }
        name += Suit[this.suit][0];
        return name;
    }

    public get prettyName(): string {
        return this.name
            .replace('S', '♠')
            .replace('C', '♣')
            .replace('D', '♦')
            .replace('H', '♥');
    }

    public constructor(suit: Suit, rank: Rank) {
        this.suit = suit;
        this.rank = rank;
    }

    public getState(): CardState {
        return {
            rank: this.rank,
            suit: this.suit,
            isHidden: this.isHidden
        };
    }

    public static fromState(cardState: CardState): Card {
        return new Card(cardState.suit, cardState.rank)
            .hide(cardState.isHidden);
    }

    public hide(isHidden: boolean = true): Card {
        this.isHidden = isHidden;
        return this;
    }

    static get AceOfSpades(): Card { return new Card(Suit.Spades, Rank.Ace); }
    static get TwoOfSpades(): Card { return new Card(Suit.Spades, Rank.Two); }
    static get ThreeOfSpades(): Card { return new Card(Suit.Spades, Rank.Three); }
    static get FourOfSpades(): Card { return new Card(Suit.Spades, Rank.Four); }
    static get FiveOfSpades(): Card { return new Card(Suit.Spades, Rank.Five); }
    static get SixOfSpades(): Card { return new Card(Suit.Spades, Rank.Six); }
    static get SevenOfSpades(): Card { return new Card(Suit.Spades, Rank.Seven); }
    static get EightOfSpades(): Card { return new Card(Suit.Spades, Rank.Eight); }
    static get NineOfSpades(): Card { return new Card(Suit.Spades, Rank.Nine); }
    static get TenOfSpades(): Card { return new Card(Suit.Spades, Rank.Ten); }
    static get JackOfSpades(): Card { return new Card(Suit.Spades, Rank.Jack ); }
    static get QueenOfSpades(): Card { return new Card(Suit.Spades, Rank.Queen); }
    static get KingOfSpades(): Card { return new Card(Suit.Spades, Rank.King); }
    static get AceOfClubs(): Card { return new Card(Suit.Clubs, Rank.Ace); }
    static get TwoOfClubs(): Card { return new Card(Suit.Clubs, Rank.Two); }
    static get ThreeOfClubs(): Card { return new Card(Suit.Clubs, Rank.Three); }
    static get FourOfClubs(): Card { return new Card(Suit.Clubs, Rank.Four); }
    static get FiveOfClubs(): Card { return new Card(Suit.Clubs, Rank.Five); }
    static get SixOfClubs(): Card { return new Card(Suit.Clubs, Rank.Six); }
    static get SevenOfClubs(): Card { return new Card(Suit.Clubs, Rank.Seven); }
    static get EightOfClubs(): Card { return new Card(Suit.Clubs, Rank.Eight); }
    static get NineOfClubs(): Card { return new Card(Suit.Clubs, Rank.Nine); }
    static get TenOfClubs(): Card { return new Card(Suit.Clubs, Rank.Ten); }
    static get JackOfClubs(): Card { return new Card(Suit.Clubs, Rank.Jack); }
    static get QueenOfClubs(): Card { return new Card(Suit.Clubs, Rank.Queen); }
    static get KingOfClubs(): Card { return new Card(Suit.Clubs, Rank.King); }
    static get AceOfHearts(): Card { return new Card(Suit.Hearts, Rank.Ace); }
    static get TwoOfHearts(): Card { return new Card(Suit.Hearts, Rank.Two); }
    static get ThreeOfHearts(): Card { return new Card(Suit.Hearts, Rank.Three); }
    static get FourOfHearts(): Card { return new Card(Suit.Hearts, Rank.Four); }
    static get FiveOfHearts(): Card { return new Card(Suit.Hearts, Rank.Five); }
    static get SixOfHearts(): Card { return new Card(Suit.Hearts, Rank.Six); }
    static get SevenOfHearts(): Card { return new Card(Suit.Hearts, Rank.Seven); }
    static get EightOfHearts(): Card { return new Card(Suit.Hearts, Rank.Eight); }
    static get NineOfHearts(): Card { return new Card(Suit.Hearts, Rank.Nine); }
    static get TenOfHearts(): Card { return new Card(Suit.Hearts, Rank.Ten); }
    static get JackOfHearts(): Card { return new Card(Suit.Hearts, Rank.Jack); }
    static get QueenOfHearts(): Card { return new Card(Suit.Hearts, Rank.Queen); }
    static get KingOfHearts(): Card { return new Card(Suit.Hearts, Rank.King); }
    static get AceOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Ace); }
    static get TwoOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Two); }
    static get ThreeOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Three); }
    static get FourOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Four); }
    static get FiveOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Five); }
    static get SixOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Six); }
    static get SevenOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Seven); }
    static get EightOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Eight); }
    static get NineOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Nine); }
    static get TenOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Ten); }
    static get JackOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Jack); }
    static get QueenOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.Queen); }
    static get KingOfDiamonds(): Card { return new Card(Suit.Diamonds, Rank.King); }

}

export enum Suit {
    Diamonds,
    Hearts,
    Spades,
    Clubs
}

export enum Color {
    Black,
    Red
}

export enum Rank {
    Ace,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King
}

export interface CardState {
    suit: Suit;
    rank: Rank;
    isHidden: boolean;
}