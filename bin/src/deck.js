"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var card_1 = require("./card");
var Deck = /** @class */ (function () {
    function Deck(name, drawnCards, hiddenCards) {
        var _this = this;
        if (name === void 0) { name = 'Deck'; }
        if (drawnCards === void 0) { drawnCards = []; }
        if (hiddenCards === void 0) { hiddenCards = []; }
        this.hiddenCards = [];
        this.drawnCards = [];
        this.name = name;
        this.drawnCards = drawnCards;
        this.drawnCards.forEach(function (c) { return c.collection = _this; });
        this.hiddenCards = hiddenCards;
        this.hiddenCards.forEach(function (c) { return c.collection = _this; });
    }
    Object.defineProperty(Deck.prototype, "lastDrawnCard", {
        get: function () {
            if (this.drawnCards.length > 0) {
                return this.drawnCards[this.drawnCards.length - 1];
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Deck.prototype, "size", {
        get: function () {
            return this.hiddenCards.length + this.drawnCards.length;
            ;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Deck.prototype, "isEmpty", {
        get: function () {
            return this.size == 0;
        },
        enumerable: false,
        configurable: true
    });
    Deck.prototype.deal = function (cards) {
        this.hiddenCards = __spreadArrays(cards);
        for (var _i = 0, _a = this.hiddenCards; _i < _a.length; _i++) {
            var card = _a[_i];
            card.collection = this;
        }
    };
    Deck.prototype.draw = function () {
        if (this.isEmpty) {
            return null;
        }
        if (this.hiddenCards.length == 0) {
            this.hiddenCards = this.drawnCards;
            this.drawnCards = [];
        }
        var drawnCard = this.hiddenCards.shift();
        this.drawnCards.push(drawnCard);
        return drawnCard;
    };
    Deck.prototype.canTake = function (card) {
        if (this.drawnCards.length == 0) {
            return false;
        }
        if (this.lastDrawnCard.name != card.name) {
            return false;
        }
        return true;
    };
    Deck.prototype.canPut = function (cards) {
        throw new Error('Method not implemented.');
    };
    Deck.prototype.peak = function (card) {
        if (this.canTake(card)) {
            return [this.lastDrawnCard];
        }
        return null;
    };
    Deck.prototype.take = function (card) {
        if (this.canTake(card)) {
            return [this.drawnCards.pop()];
        }
        return null;
    };
    Deck.prototype.put = function (cards) {
        throw new Error('Not allowed to place cards back on deck');
    };
    Deck.prototype.getState = function () {
        return {
            name: this.name,
            hiddenCards: this.hiddenCards.map(function (c) { return c.getState(); }),
            drawnCards: this.drawnCards.map(function (c) { return c.getState(); })
        };
    };
    Deck.fromState = function (deckState) {
        return new Deck(deckState.name, deckState.drawnCards.map(function (c) { return card_1.Card.fromState(c); }), deckState.hiddenCards.map(function (c) { return card_1.Card.fromState(c); }));
    };
    return Deck;
}());
exports.Deck = Deck;
