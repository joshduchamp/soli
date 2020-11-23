"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foundation = void 0;
var card_1 = require("./card");
var Foundation = /** @class */ (function () {
    function Foundation(name, cards) {
        var _this = this;
        if (cards === void 0) { cards = []; }
        this.cards = [];
        this.name = name;
        cards.forEach(function (c) { return _this.put([c]); });
    }
    Object.defineProperty(Foundation.prototype, "size", {
        get: function () {
            return this.cards.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "isEmpty", {
        get: function () {
            return this.cards.length == 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "suit", {
        get: function () {
            if (this.isEmpty) {
                return null;
            }
            return this.cards[0].suit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Foundation.prototype, "topCard", {
        get: function () {
            if (this.isEmpty) {
                return null;
            }
            return this.cards[this.size - 1];
        },
        enumerable: false,
        configurable: true
    });
    Foundation.prototype.canPut = function (cards) {
        if (cards.length > 1) {
            return false;
        }
        var card = cards[0];
        return (this.isEmpty || this.suit == card.suit) && this.size == card.rank;
    };
    Foundation.prototype.put = function (cards) {
        if (this.canPut(cards)) {
            var card = cards[0];
            this.cards.push(card);
            card.collection = this;
        }
    };
    Foundation.prototype.take = function (card) {
        if (this.canTake(card)) {
            return [this.cards.pop()];
        }
        return null;
    };
    Foundation.prototype.canTake = function (card) {
        if (this.isEmpty) {
            return false;
        }
        if (this.topCard.name != card.name) {
            return false;
        }
        return true;
    };
    Foundation.prototype.peak = function (card) {
        if (this.canTake(card)) {
            return [this.topCard];
        }
        return null;
    };
    Foundation.prototype.getState = function () {
        return {
            name: this.name,
            cards: this.cards.map(function (c) { return c.getState(); })
        };
    };
    Foundation.fromState = function (foundationState) {
        return new Foundation(foundationState.name, foundationState.cards.map(function (c) { return card_1.Card.fromState(c); }));
    };
    return Foundation;
}());
exports.Foundation = Foundation;
