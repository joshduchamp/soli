"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pile = void 0;
var card_1 = require("./card");
var Pile = /** @class */ (function () {
    function Pile(name, cards) {
        var _this = this;
        if (cards === void 0) { cards = []; }
        this.cards = [];
        this.name = name;
        cards.forEach(function (c) { return _this.deal(c); });
    }
    Object.defineProperty(Pile.prototype, "size", {
        get: function () {
            return this.cards.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pile.prototype, "isEmpty", {
        get: function () {
            return this.cards.length == 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pile.prototype, "topCard", {
        get: function () {
            return this.isEmpty
                ? null
                : this.cards[this.size - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pile.prototype, "color", {
        get: function () {
            return this.isEmpty
                ? null
                : this.topCard.color;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pile.prototype, "nextColor", {
        get: function () {
            if (this.isEmpty) {
                return null;
            }
            return this.color == card_1.Color.Black ? card_1.Color.Red : card_1.Color.Black;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pile.prototype, "rank", {
        get: function () {
            return this.isEmpty
                ? null
                : this.topCard.rank;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pile.prototype, "nextRank", {
        get: function () {
            if (this.isEmpty) {
                return null;
            }
            if (this.rank == card_1.Rank.Ace) {
                return null;
            }
            return this.rank - 1;
        },
        enumerable: false,
        configurable: true
    });
    Pile.prototype.canPut = function (cards) {
        if (cards.length == 0) {
            return false;
        }
        if (this.isEmpty && cards[0].rank == card_1.Rank.King) {
            return true;
        }
        if (!this.isEmpty && this.nextColor == cards[0].color && this.nextRank == cards[0].rank) {
            return true;
        }
        return false;
    };
    Pile.prototype.put = function (cards) {
        if (this.canPut(cards)) {
            this.cards = this.cards.concat(cards);
            for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                var card = cards_1[_i];
                card.collection = this;
            }
        }
    };
    Pile.prototype.deal = function (card) {
        card.collection = this;
        this.cards.push(card);
    };
    Pile.prototype.dealHidden = function (card) {
        card.isHidden = true;
        this.deal(card);
    };
    Pile.prototype.take = function (card) {
        if (this.canTake(card)) {
            var index = this.cards.findIndex(function (c) { return c.name == card.name; });
            var cardsToTake = this.cards.splice(index, this.cards.length);
            if (!this.isEmpty) {
                this.topCard.isHidden = false;
            }
            return cardsToTake;
        }
        return null;
    };
    Pile.prototype.canTake = function (card) {
        var index = this.cards.findIndex(function (c) {
            return c.name == card.name && !c.isHidden;
        });
        return index != -1;
    };
    Pile.prototype.peak = function (card) {
        if (this.canTake(card)) {
            var index = this.cards.findIndex(function (c) { return c.name == card.name; });
            return this.cards.slice(index, this.cards.length);
        }
        return null;
    };
    Pile.prototype.getState = function () {
        return {
            name: this.name,
            cards: this.cards.map(function (c) { return c.getState(); })
        };
    };
    Pile.fromState = function (pileState) {
        return new Pile(pileState.name, pileState.cards.map(function (c) { return card_1.Card.fromState(c); }));
    };
    return Pile;
}());
exports.Pile = Pile;
