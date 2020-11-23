"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
var pile_1 = require("../src/pile");
var card_1 = require("../src/card");
test('can put King on empty pile', function () {
    var pile = new pile_1.Pile();
    var king = card_1.Card.KingOfHearts;
    pile.put([king]);
    expect(pile.size).toBe(1);
    expect(king.collection).toBe(pile);
});
test('cannot put non-king card on empty pile', function () {
    var pile = new pile_1.Pile();
    var ace = card_1.Card.AceOfClubs;
    pile.put([ace]);
    expect(pile.isEmpty).toBe(true);
});
test('can put cards on pile in descending rank of alternating color', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfClubs]);
    pile.put([card_1.Card.QueenOfDiamonds]);
    pile.put([card_1.Card.JackOfSpades]);
    pile.put([card_1.Card.TenOfHearts]);
    pile.put([card_1.Card.NineOfClubs]);
    pile.put([card_1.Card.EightOfDiamonds]);
    pile.put([card_1.Card.SevenOfClubs]);
    pile.put([card_1.Card.SixOfHearts]);
    pile.put([card_1.Card.FiveOfSpades]);
    pile.put([card_1.Card.FourOfHearts]);
    pile.put([card_1.Card.ThreeOfSpades]);
    pile.put([card_1.Card.TwoOfDiamonds]);
    pile.put([card_1.Card.AceOfSpades]);
    expect(pile.size).toBe(13);
});
test('cannot put card of same color as last card on pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfDiamonds]);
    pile.put([card_1.Card.QueenOfHearts]);
    expect(pile.size).toBe(1);
});
test('cannot put card of higher rank than last card on pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfDiamonds]);
    pile.put([card_1.Card.QueenOfClubs]);
    pile.put([card_1.Card.KingOfHearts]);
    expect(pile.size).toBe(2);
});
test('cannot put card of several ranks lower on pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfDiamonds]);
    pile.put([card_1.Card.JackOfSpades]);
    expect(pile.size).toBe(1);
});
test('can take top card from pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfDiamonds]);
    var card = pile.take(card_1.Card.KingOfDiamonds);
    expect(card[0].name).toBe(card_1.Card.KingOfDiamonds.name);
});
test('can deal hidden card on pile', function () {
    var pile = new pile_1.Pile();
    var card1 = card_1.Card.EightOfSpades;
    var card2 = card_1.Card.NineOfClubs;
    pile.dealHidden(card1);
    pile.dealHidden(card2);
    expect(pile.size).toBe(2);
    expect(card1.isHidden).toBe(true);
    expect(card2.isHidden).toBe(true);
    expect(card1.collection).toBe(pile);
    expect(card2.collection).toBe(pile);
});
test('can deal visible card on pile', function () {
    var pile = new pile_1.Pile();
    var card = card_1.Card.EightOfSpades;
    pile.deal(card);
    expect(pile.size).toBe(1);
    expect(card.isHidden).toBe(false);
    expect(card.collection).toBe(pile);
});
test('make top card visible after taking a card', function () {
    var pile = new pile_1.Pile();
    var card = card_1.Card.SixOfHearts;
    pile.dealHidden(card);
    pile.deal(card_1.Card.FourOfHearts);
    expect(card.isHidden).toBe(true);
    pile.take(card_1.Card.FourOfHearts);
    expect(card.isHidden).toBe(false);
});
test('can take multiple cards from pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfClubs]);
    pile.put([card_1.Card.QueenOfHearts]);
    pile.put([card_1.Card.JackOfClubs]);
    pile.put([card_1.Card.TenOfHearts]);
    expect(pile.size).toBe(4);
    var cards = pile.take(card_1.Card.QueenOfHearts);
    expect(pile.size).toBe(1);
    expect(cards.length).toBe(3);
});
test('can peak multiple cards from pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfClubs]);
    pile.put([card_1.Card.QueenOfHearts]);
    pile.put([card_1.Card.JackOfClubs]);
    pile.put([card_1.Card.TenOfHearts]);
    expect(pile.size).toBe(4);
    var cards = pile.peak(card_1.Card.QueenOfHearts);
    expect(pile.size).toBe(4);
    expect(cards.length).toBe(3);
});
test('when taking pile, return null if card is not found in pile', function () {
    var pile = new pile_1.Pile();
    pile.put([card_1.Card.KingOfClubs]);
    pile.put([card_1.Card.QueenOfHearts]);
    expect(pile.size).toBe(2);
    var cards = pile.take(card_1.Card.SixOfHearts);
    expect(pile.size).toBe(2);
    expect(cards).toBe(null);
});
test('when taking pile, return null if card is hidden', function () {
    var pile = new pile_1.Pile();
    pile.dealHidden(card_1.Card.KingOfClubs);
    pile.deal(card_1.Card.TwoOfDiamonds);
    expect(pile.size).toBe(2);
    var pile2 = pile.take(card_1.Card.KingOfDiamonds);
    expect(pile.size).toBe(2);
    expect(pile2).toBe(null);
});
test('can get pile state', function () {
    var pile = new pile_1.Pile('Pile 1', [
        card_1.Card.AceOfDiamonds.hide(),
        card_1.Card.FiveOfSpades.hide(),
        card_1.Card.JackOfHearts.hide(),
        card_1.Card.JackOfSpades,
        card_1.Card.TenOfHearts
    ]);
    var pileState = pile.getState();
    expect(pileState.name).toBe('Pile 1');
    expect(pileState.cards.length).toBe(5);
});
test('can create pile from pile state', function () {
    var pileState = {
        name: 'Pile 1',
        cards: [
            card_1.Card.AceOfDiamonds.hide().getState(),
            card_1.Card.FiveOfSpades.hide().getState(),
            card_1.Card.JackOfHearts.hide().getState(),
            card_1.Card.JackOfSpades.getState(),
            card_1.Card.TenOfHearts.getState()
        ]
    };
    var pile = pile_1.Pile.fromState(pileState);
    expect(pile.name).toBe('Pile 1');
    expect(pile.size).toBe(5);
});
test('constructor can deal cards and set name', function () {
    var name = 'Pile 1';
    var cards = [
        card_1.Card.AceOfSpades.hide(),
        card_1.Card.KingOfClubs.hide(),
        card_1.Card.JackOfClubs
    ];
    var pile = new pile_1.Pile(name, cards);
    expect(pile.name).toBe(name);
    expect(pile.size).toBe(3);
    var isCollectionSet = pile.cards.every(function (c) { var _a; return ((_a = c.collection) === null || _a === void 0 ? void 0 : _a.name) == pile.name; });
    expect(isCollectionSet).toBe(true);
});
test('can put multiple cards on pile', function () {
    var pile = new pile_1.Pile('Pile1', [
        card_1.Card.FourOfClubs
    ]);
    var cards = [
        card_1.Card.ThreeOfHearts,
        card_1.Card.TwoOfClubs
    ];
    expect(pile.size).toBe(1);
    pile.put(cards);
    expect(pile.size).toBe(3);
});
