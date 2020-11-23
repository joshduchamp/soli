"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
var foundation_1 = require("../src/foundation");
var card_1 = require("../src/card");
test('can put ace on foundation', function () {
    var foundation = new foundation_1.Foundation();
    var card = card_1.Card.AceOfSpades;
    foundation.put([card]);
    expect(foundation.size).toBe(1);
    expect(card.collection).toBe(foundation);
});
test('can put cards of same suit on foundation in order of rank', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.AceOfSpades]);
    foundation.put([card_1.Card.TwoOfSpades]);
    foundation.put([card_1.Card.ThreeOfSpades]);
    foundation.put([card_1.Card.FourOfSpades]);
    foundation.put([card_1.Card.FiveOfSpades]);
    foundation.put([card_1.Card.SixOfSpades]);
    foundation.put([card_1.Card.SevenOfSpades]);
    foundation.put([card_1.Card.EightOfSpades]);
    foundation.put([card_1.Card.NineOfSpades]);
    foundation.put([card_1.Card.TenOfSpades]);
    foundation.put([card_1.Card.JackOfSpades]);
    foundation.put([card_1.Card.QueenOfSpades]);
    foundation.put([card_1.Card.KingOfSpades]);
    expect(foundation.size).toBe(13);
});
test('can get suit of foundation', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.AceOfSpades]);
    expect(foundation.suit).toBe(card_1.Suit.Spades);
});
test('can put cards of same suit', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.AceOfSpades]);
    foundation.put([card_1.Card.TwoOfHearts]);
    expect(foundation.size).toBe(1);
});
test('cannot put card several ranks higher', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.AceOfSpades]);
    foundation.put([card_1.Card.ThreeOfSpades]);
    expect(foundation.size).toBe(1);
});
test('cannot place non-ace on empty foundation', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.ThreeOfSpades]);
    expect(foundation.isEmpty).toBe(true);
});
test('can take card from foundation', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.AceOfSpades]);
    expect(foundation.size).toBe(1);
    var cards = foundation.take(card_1.Card.AceOfSpades);
    expect(foundation.size).toBe(0);
    expect(cards[0].id).toBe(card_1.Card.AceOfSpades.id);
});
test('can peak at cards', function () {
    var foundation = new foundation_1.Foundation();
    foundation.put([card_1.Card.AceOfSpades]);
    expect(foundation.size).toBe(1);
    var cards = foundation.peak(card_1.Card.AceOfSpades);
    expect(foundation.size).toBe(1);
    expect(cards[0].name).toBe(card_1.Card.AceOfSpades.name);
});
test('can get foundation state from foundation', function () {
    var foundation = new foundation_1.Foundation('Foundation 1', [card_1.Card.AceOfSpades, card_1.Card.TwoOfSpades]);
    var foundationState = foundation.getState();
    expect(foundationState.name).toBe('Foundation 1');
    expect(foundationState.cards.length).toBe(2);
});
test('can create foundation from foundation state', function () {
    var foundationState = {
        name: 'Foundation 1',
        cards: [card_1.Card.AceOfSpades, card_1.Card.TwoOfSpades]
    };
    var foundation = foundation_1.Foundation.fromState(foundationState);
    expect(foundation.name).toBe('Foundation 1');
    expect(foundation.size).toBe(2);
});
test('can create foundation with cards and name from constructor', function () {
    var cards = [
        card_1.Card.AceOfSpades,
        card_1.Card.TwoOfSpades
    ];
    var name = 'Foundation 1';
    var foundation = new foundation_1.Foundation(name, cards);
    expect(foundation.name).toBe('Foundation 1');
    expect(foundation.size).toBe(2);
    var isCollectionSet = foundation.cards.every(function (c) { var _a; return ((_a = c.collection) === null || _a === void 0 ? void 0 : _a.name) == 'Foundation 1'; });
    expect(isCollectionSet).toBe(true);
});
