"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rank = exports.Color = exports.Suit = exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(suit, rank) {
        this.isHidden = false;
        this.collection = null;
        this.suit = suit;
        this.rank = rank;
    }
    Object.defineProperty(Card.prototype, "color", {
        get: function () {
            if (this.suit == Suit.Clubs || this.suit == Suit.Spades) {
                return Color.Black;
            }
            return Color.Red;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "id", {
        get: function () {
            return (this.suit * 13) + this.rank;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "name", {
        get: function () {
            var name = '';
            switch (this.rank) {
                case Rank.Ace:
                case Rank.Jack:
                case Rank.Queen:
                case Rank.King:
                    name += Rank[this.rank][0];
                    break;
                default:
                    name += (this.rank + 1).toString();
            }
            name += Suit[this.suit][0];
            return name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "prettyName", {
        get: function () {
            return this.name
                .replace('S', '♠')
                .replace('C', '♣')
                .replace('D', '♦')
                .replace('H', '♥');
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.getState = function () {
        return {
            rank: this.rank,
            suit: this.suit,
            isHidden: this.isHidden
        };
    };
    Card.fromState = function (cardState) {
        return new Card(cardState.suit, cardState.rank)
            .hide(cardState.isHidden);
    };
    Card.prototype.hide = function (isHidden) {
        if (isHidden === void 0) { isHidden = true; }
        this.isHidden = isHidden;
        return this;
    };
    Object.defineProperty(Card, "AceOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Ace); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TwoOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Two); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "ThreeOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Three); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FourOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Four); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FiveOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Five); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SixOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Six); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SevenOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Seven); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "EightOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Eight); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "NineOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Nine); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TenOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Ten); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "JackOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Jack); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "QueenOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.Queen); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "KingOfSpades", {
        get: function () { return new Card(Suit.Spades, Rank.King); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "AceOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Ace); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TwoOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Two); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "ThreeOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Three); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FourOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Four); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FiveOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Five); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SixOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Six); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SevenOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Seven); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "EightOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Eight); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "NineOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Nine); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TenOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Ten); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "JackOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Jack); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "QueenOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.Queen); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "KingOfClubs", {
        get: function () { return new Card(Suit.Clubs, Rank.King); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "AceOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Ace); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TwoOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Two); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "ThreeOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Three); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FourOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Four); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FiveOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Five); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SixOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Six); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SevenOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Seven); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "EightOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Eight); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "NineOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Nine); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TenOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Ten); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "JackOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Jack); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "QueenOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.Queen); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "KingOfHearts", {
        get: function () { return new Card(Suit.Hearts, Rank.King); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "AceOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Ace); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TwoOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Two); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "ThreeOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Three); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FourOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Four); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "FiveOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Five); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SixOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Six); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "SevenOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Seven); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "EightOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Eight); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "NineOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Nine); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "TenOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Ten); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "JackOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Jack); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "QueenOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.Queen); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card, "KingOfDiamonds", {
        get: function () { return new Card(Suit.Diamonds, Rank.King); },
        enumerable: false,
        configurable: true
    });
    return Card;
}());
exports.Card = Card;
var Suit;
(function (Suit) {
    Suit[Suit["Diamonds"] = 0] = "Diamonds";
    Suit[Suit["Hearts"] = 1] = "Hearts";
    Suit[Suit["Spades"] = 2] = "Spades";
    Suit[Suit["Clubs"] = 3] = "Clubs";
})(Suit = exports.Suit || (exports.Suit = {}));
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["Red"] = 1] = "Red";
})(Color = exports.Color || (exports.Color = {}));
var Rank;
(function (Rank) {
    Rank[Rank["Ace"] = 0] = "Ace";
    Rank[Rank["Two"] = 1] = "Two";
    Rank[Rank["Three"] = 2] = "Three";
    Rank[Rank["Four"] = 3] = "Four";
    Rank[Rank["Five"] = 4] = "Five";
    Rank[Rank["Six"] = 5] = "Six";
    Rank[Rank["Seven"] = 6] = "Seven";
    Rank[Rank["Eight"] = 7] = "Eight";
    Rank[Rank["Nine"] = 8] = "Nine";
    Rank[Rank["Ten"] = 9] = "Ten";
    Rank[Rank["Jack"] = 10] = "Jack";
    Rank[Rank["Queen"] = 11] = "Queen";
    Rank[Rank["King"] = 12] = "King";
})(Rank = exports.Rank || (exports.Rank = {}));
