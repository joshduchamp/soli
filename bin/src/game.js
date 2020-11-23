"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var card_1 = require("./card");
var foundation_1 = require("./foundation");
var pile_1 = require("./pile");
var deck_1 = require("./deck");
var Game = /** @class */ (function () {
    function Game(gameState) {
        var _this = this;
        this.cardMap = {};
        this.foundationMap = {};
        this.pileMap = {};
        for (var i = 1; i <= 4; i++) {
            var foundation = new foundation_1.Foundation('F' + i);
            this.foundationMap[foundation.name] = foundation;
        }
        for (var i = 1; i <= 7; i++) {
            var pile = new pile_1.Pile('P' + i);
            this.pileMap[pile.name] = pile;
        }
        this.deck = new deck_1.Deck();
        if (gameState != null) {
            gameState.piles
                .map(function (p) { return pile_1.Pile.fromState(p); })
                .forEach(function (p) { return _this.pileMap[p.name] = p; });
            gameState.foundations
                .map(function (f) { return foundation_1.Foundation.fromState(f); })
                .forEach(function (f) { return _this.foundationMap[f.name] = f; });
            this.deck = deck_1.Deck.fromState(gameState.deck);
            // get cards from piles, foundations, and deck and add to card map
            this.piles.reduce(function (arr, p) { return arr.concat(p.cards); }, [])
                .concat(this.foundations.reduce(function (arr, f) { return arr.concat(f.cards); }, []))
                .concat(this.deck.hiddenCards)
                .concat(this.deck.drawnCards)
                .forEach(function (c) { return _this.cardMap[c.name] = c; });
        }
    }
    Object.defineProperty(Game.prototype, "foundations", {
        get: function () {
            return Object.values(this.foundationMap);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "piles", {
        get: function () {
            return Object.values(this.pileMap);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "emptyFoundation", {
        get: function () {
            return this.foundations.find(function (f) { return f.isEmpty; });
        },
        enumerable: false,
        configurable: true
    });
    Game.createCards = function () {
        var cards = [];
        for (var i = 0; i < 4; i++) {
            var suit = i;
            for (var j = 0; j < 13; j++) {
                var rank = j;
                var card = new card_1.Card(suit, rank);
                cards.push(card);
            }
        }
        return cards;
    };
    Game.shuffle = function (cards) {
        var _a;
        var array = __spreadArrays(cards);
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        return array;
    };
    Game.prototype.deal = function (cards) {
        var _this = this;
        if (cards.length != 52) {
            return;
        }
        var cardsToDeal = __spreadArrays(cards);
        for (var i = 0; i < 7; i++) {
            this.piles[i].deal(cardsToDeal.pop());
            for (var j = i + 1; j < 7; j++) {
                this.piles[j].dealHidden(cardsToDeal.pop());
            }
        }
        this.deck.deal(cardsToDeal);
        cards.forEach(function (c) { return _this.cardMap[c.name] = c; });
    };
    Game.prototype.canMove = function (cardName, ontoName) {
        var _a, _b, _c;
        var card = this.cardMap[cardName];
        if (card == null) {
            return false;
        }
        if (card.collection.canTake(card)) {
            var cards = card.collection.peak(card);
            var ontoCollection = (_c = (_b = (_a = this.cardMap[ontoName]) === null || _a === void 0 ? void 0 : _a.collection) !== null && _b !== void 0 ? _b : this.pileMap[ontoName]) !== null && _c !== void 0 ? _c : this.foundationMap[ontoName];
            if (ontoCollection != null) {
                return ontoCollection.canPut(cards);
            }
        }
        return false;
    };
    Game.prototype.move = function (cardName, ontoName) {
        var _a, _b, _c;
        if (this.canMove(cardName, ontoName)) {
            var card = this.cardMap[cardName];
            var ontoCollection = (_c = (_b = (_a = this.cardMap[ontoName]) === null || _a === void 0 ? void 0 : _a.collection) !== null && _b !== void 0 ? _b : this.pileMap[ontoName]) !== null && _c !== void 0 ? _c : this.foundationMap[ontoName];
            var cards = card.collection.take(card);
            ontoCollection.put(cards);
        }
    };
    Game.prototype.newGame = function () {
        var cards = Game.createCards();
        cards = Game.shuffle(cards);
        this.deal(cards);
    };
    Game.prototype.getState = function () {
        return {
            piles: this.piles.map(function (p) { return p.getState(); }),
            foundations: this.foundations.map(function (f) { return f.getState(); }),
            deck: this.deck.getState()
        };
    };
    Game.fromState = function (gameState) {
        return new Game(gameState);
    };
    return Game;
}());
exports.Game = Game;
